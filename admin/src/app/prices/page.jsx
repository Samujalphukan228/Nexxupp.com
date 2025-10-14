"use client";

import React, { useState, useEffect } from "react";
import { FiPlusCircle, FiCheck, FiTrash2, FiX, FiEdit2, FiStar, FiDollarSign, FiTag, FiList, FiAlertCircle, FiSearch } from "react-icons/fi";
import { useAppContext } from "@/context/Context";
import { toast } from "react-toastify";

const PricingPage = () => {
    const { token, price, addPricePlan, removePricePlan, fetchPrices } = useAppContext();

    // Form states
    const [category, setCategory] = useState("");
    const [planPrice, setPlanPrice] = useState("");
    const [description, setDescription] = useState("");
    const [featureInput, setFeatureInput] = useState("");
    const [features, setFeatures] = useState([]);
    const [isPopular, setIsPopular] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({ category: false, planPrice: false, description: false });

    // Display states
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (token) fetchPrices(token);
    }, [token]);

    // Validation
    const getCategoryError = () => {
        if (!touched.category) return "";
        if (!category) return "Category is required";
        return "";
    };

    const getPriceError = () => {
        if (!touched.planPrice) return "";
        if (!planPrice) return "Price is required";
        if (Number(planPrice) <= 0) return "Price must be greater than 0";
        return "";
    };

    const getDescriptionError = () => {
        if (!touched.description) return "";
        if (!description) return "Description is required";
        if (description.length < 10) return "Description must be at least 10 characters";
        return "";
    };

    const isFormValid = category && planPrice && description && Number(planPrice) > 0 && features.length > 0;

    // Filter plans
    const filteredPlans = price.filter(plan => 
        plan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add feature
    const handleAddFeature = () => {
        if (!featureInput.trim()) {
            setError("Feature cannot be empty");
            return;
        }
        if (features.includes(featureInput.trim())) {
            setError("Feature already exists");
            return;
        }
        setFeatures([...features, featureInput.trim()]);
        setFeatureInput("");
        setError("");
    };

    const handleRemoveFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    // Add/Update plan
    const handleAddPlan = async (e) => {
        e.preventDefault();
        
        setTouched({ category: true, planPrice: true, description: true });

        if (!isFormValid) {
            setError("Please fill all required fields and add at least one feature");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const newPlan = {
                category,
                price: Number(planPrice),
                description,
                features,
                popular: isPopular,
            };

            await addPricePlan(newPlan);

            // Reset form
            setCategory("");
            setPlanPrice("");
            setDescription("");
            setFeatures([]);
            setFeatureInput("");
            setIsPopular(false);
            setTouched({ category: false, planPrice: false, description: false });
            setSuccessMessage("Price plan added successfully! 🎉");
            
            setTimeout(() => setSuccessMessage(""), 5000);
        } catch (err) {
            setError("Failed to add price plan. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Remove plan
    const handleRemovePlan = async (id) => {
        try {
            await removePricePlan(id);
            setDeleteConfirm(null);
            setSuccessMessage("Price plan deleted successfully");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError("Failed to delete plan");
        }
    };

    return (
        <section className=" py-8 sm:py-12 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                        Pricing Management
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Create and manage your pricing plans
                    </p>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3 animate-slide-down">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <FiCheck className="text-white text-sm" />
                        </div>
                        <p className="text-green-800 font-medium flex-1">{successMessage}</p>
                        <button onClick={() => setSuccessMessage("")} className="text-green-600 hover:text-green-800">
                            <FiX />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-shake">
                        <FiAlertCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                        <p className="text-red-800 font-medium flex-1">{error}</p>
                        <button onClick={() => setError("")} className="text-red-600 hover:text-red-800">
                            <FiX />
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    
                    {/* Add Plan Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 sticky top-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <FiPlusCircle className="text-white text-xl" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Plan</h2>
                            </div>

                            <form onSubmit={handleAddPlan} className="space-y-5">
                                
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <div className="relative">
                                        <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            onBlur={() => setTouched({ ...touched, category: true })}
                                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all outline-none appearance-none bg-white ${
                                                getCategoryError() 
                                                    ? 'border-red-300 focus:border-red-500' 
                                                    : 'border-gray-200 focus:border-green-500'
                                            }`}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Starter">Starter</option>
                                            <option value="Professional">Professional</option>
                                            <option value="Business">Business</option>
                                            <option value="Enterprise">Enterprise</option>
                                            <option value="Portfolio">Portfolio</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Custom">Custom</option>
                                        </select>
                                        {category && !getCategoryError() && touched.category && (
                                            <FiCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                                        )}
                                    </div>
                                    {getCategoryError() && (
                                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                            <FiAlertCircle className="flex-shrink-0" />
                                            {getCategoryError()}
                                        </p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Price ($) *
                                    </label>
                                    <div className="relative">
                                        <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            value={planPrice}
                                            onChange={(e) => setPlanPrice(e.target.value)}
                                            onBlur={() => setTouched({ ...touched, planPrice: true })}
                                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all outline-none ${
                                                getPriceError() 
                                                    ? 'border-red-300 focus:border-red-500' 
                                                    : 'border-gray-200 focus:border-green-500'
                                            }`}
                                            placeholder="99"
                                            min="0"
                                            step="0.01"
                                        />
                                        {planPrice && !getPriceError() && touched.planPrice && (
                                            <FiCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                                        )}
                                    </div>
                                    {getPriceError() && (
                                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                            <FiAlertCircle className="flex-shrink-0" />
                                            {getPriceError()}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                            e.target.style.height = "auto";
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                        onBlur={() => setTouched({ ...touched, description: true })}
                                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all outline-none resize-none ${
                                            getDescriptionError() 
                                                ? 'border-red-300 focus:border-red-500' 
                                                : 'border-gray-200 focus:border-green-500'
                                        }`}
                                        placeholder="Perfect for small businesses..."
                                        rows="3"
                                    />
                                    {getDescriptionError() && (
                                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                            <FiAlertCircle className="flex-shrink-0" />
                                            {getDescriptionError()}
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Features *
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <div className="relative flex-1">
                                            <FiList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={featureInput}
                                                onChange={(e) => setFeatureInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-green-500 transition-all"
                                                placeholder="e.g., 24/7 Support"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddFeature}
                                            className="px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center"
                                        >
                                            <FiPlusCircle className="text-xl" />
                                        </button>
                                    </div>
                                    
                                    {/* Features List */}
                                    {features.length > 0 ? (
                                        <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-xl p-3 border border-gray-200">
                                            {features.map((feat, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg border border-gray-200 group hover:border-green-300 transition-all"
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <FiCheck className="text-green-500 flex-shrink-0" />
                                                        <span className="text-sm text-gray-700">{feat}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFeature(idx)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <FiX className="text-lg" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                            <FiList className="mx-auto text-3xl text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">No features added yet</p>
                                            <p className="text-xs text-gray-400 mt-1">Add at least one feature</p>
                                        </div>
                                    )}
                                </div>

                                {/* Popular Toggle */}
                                <div className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                                    <div className="flex items-center gap-2">
                                        <FiStar className="text-yellow-600" />
                                        <span className="text-sm font-semibold text-gray-700">Mark as Popular</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isPopular}
                                            onChange={(e) => setIsPopular(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isFormValid}
                                    className={`w-full py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                                        isSubmitting || !isFormValid
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Adding Plan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiPlusCircle className="text-xl" />
                                            <span>Add Price Plan</span>
                                        </>
                                    )}
                                </button>

                                {/* Form Stats */}
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>Features: {features.length}</span>
                                        <span className={features.length > 0 ? 'text-green-600 font-medium' : ''}>
                                            {features.length > 0 ? '✓ Ready' : 'Add features'}
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Plans List */}
                    <div className="lg:col-span-2">
                        
                        {/* Search Bar */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    Pricing Plans
                                    <span className="text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        {filteredPlans.length}
                                    </span>
                                </h2>
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search plans..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Plans Grid */}
                        {filteredPlans.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiDollarSign className="text-4xl text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {searchTerm ? "No plans found" : "No pricing plans yet"}
                                </h3>
                                <p className="text-gray-500">
                                    {searchTerm 
                                        ? "Try adjusting your search" 
                                        : "Add your first pricing plan to get started"}
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                                {filteredPlans.map((plan) => (
                                    <div
                                        key={plan._id}
                                        className={`bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group ${
                                            plan.popular 
                                                ? 'border-yellow-400 shadow-lg shadow-yellow-100 ring-2 ring-yellow-200' 
                                                : 'border-gray-200 hover:border-green-300 hover:shadow-xl'
                                        }`}
                                    >
                                        {/* Popular Badge */}
                                        {plan.popular && (
                                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 px-4">
                                                <div className="flex items-center justify-center gap-2 text-sm font-bold">
                                                    <FiStar className="text-white" />
                                                    <span>MOST POPULAR</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Header */}
                                            <div className="mb-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-2xl font-bold text-gray-900">
                                                        {plan.category}
                                                    </h3>
                                                </div>
                                                
                                                {/* Price */}
                                                <div className="flex items-baseline gap-1 mb-3">
                                                    <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                        ${plan.price}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">/month</span>
                                                </div>

                                                {/* Description */}
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {plan.description}
                                                </p>
                                            </div>

                                            {/* Features */}
                                            <div className="mb-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <FiList className="text-gray-400" />
                                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                        Features ({plan.features.length})
                                                    </span>
                                                </div>
                                                <ul className="space-y-2.5">
                                                    {plan.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start gap-2.5">
                                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <FiCheck className="text-green-600 text-xs" />
                                                            </div>
                                                            <span className="text-sm text-gray-700 leading-relaxed">
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Actions */}
                                            <div className="pt-6 border-t border-gray-200">
                                                <button
                                                    onClick={() => setDeleteConfirm(plan._id)}
                                                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all border border-red-200"
                                                >
                                                    <FiTrash2 />
                                                    Delete Plan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scale-in">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiTrash2 className="text-red-600 text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                                Delete Pricing Plan?
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                This action cannot be undone. The plan will be permanently deleted.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleRemovePlan(deleteConfirm)}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                .animate-slide-down {
                    animation: slideDown 0.3s ease-out;
                }

                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-scale-in {
                    animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </section>
    );
};

export default PricingPage;