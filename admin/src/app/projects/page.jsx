"use client";

import { useAppContext } from "@/context/Context";
import React, { useState, useEffect, useRef } from "react";
import { FiPlusCircle, FiImage, FiTag, FiFileText, FiSearch, FiGrid, FiList, FiTrash2, FiEdit2, FiX, FiCheck, FiAlertCircle } from "react-icons/fi";

const ProjectsAddPage = () => {
    const { projects, fetchProjects, addProject, removeProject } = useAppContext();
    
    // Form states
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({ projectName: false, description: false });
    
    // Display states
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    // Get unique categories
    const categories = ["all", ...new Set(projects.map(p => p.category).filter(Boolean))];

    // Filter projects
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Validation
    const getProjectNameError = () => {
        if (!touched.projectName) return "";
        if (!projectName) return "Project name is required";
        if (projectName.length < 3) return "Project name must be at least 3 characters";
        return "";
    };

    const getDescriptionError = () => {
        if (!touched.description) return "";
        if (!description) return "Description is required";
        if (description.length < 10) return "Description must be at least 10 characters";
        return "";
    };

    const isFormValid = projectName && description && image && !getProjectNameError() && !getDescriptionError();

    // Image handling
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        processImage(file);
    };

    const processImage = (file) => {
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setError("Image size should be less than 5MB");
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setError("");
        }
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setTouched({ projectName: true, description: true });

        if (!isFormValid) {
            setError("Please fill in all required fields correctly");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("title", projectName);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("image", image);

            await addProject(formData);

            // Reset form
            setProjectName("");
            setDescription("");
            setCategory("");
            setImage(null);
            setImagePreview(null);
            setTouched({ projectName: false, description: false });
            setSuccessMessage("Project added successfully! 🎉");
            
            setTimeout(() => setSuccessMessage(""), 5000);
        } catch (err) {
            setError("Failed to add project. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete project
    const handleDelete = async (id) => {
        await removeProject(id);
        setDeleteConfirm(null);
        setSuccessMessage("Project deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    return (
        <section className=" py-8 sm:py-12 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                        Project Management
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Create and manage your portfolio projects
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
                    
                    {/* Add Project Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 sticky top-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <FiPlusCircle className="text-white text-xl" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Project</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                
                                {/* Project Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Project Name *
                                    </label>
                                    <div className="relative">
                                        <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            onBlur={() => setTouched({ ...touched, projectName: true })}
                                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all outline-none ${
                                                getProjectNameError() 
                                                    ? 'border-red-300 focus:border-red-500' 
                                                    : 'border-gray-200 focus:border-blue-500'
                                            }`}
                                            placeholder="Enter project name"
                                        />
                                        {projectName && !getProjectNameError() && touched.projectName && (
                                            <FiCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                                        )}
                                    </div>
                                    {getProjectNameError() && (
                                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                            <FiAlertCircle className="flex-shrink-0" />
                                            {getProjectNameError()}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <div className="relative">
                                        <FiFileText className="absolute left-4 top-4 text-gray-400" />
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            onBlur={() => setTouched({ ...touched, description: true })}
                                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all outline-none resize-none ${
                                                getDescriptionError() 
                                                    ? 'border-red-300 focus:border-red-500' 
                                                    : 'border-gray-200 focus:border-blue-500'
                                            }`}
                                            placeholder="Describe your project"
                                            rows="4"
                                        />
                                    </div>
                                    {getDescriptionError() && (
                                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                            <FiAlertCircle className="flex-shrink-0" />
                                            {getDescriptionError()}
                                        </p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <FiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all outline-none focus:border-blue-500"
                                            placeholder="e.g., Web Design, Mobile App"
                                        />
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Project Image *
                                    </label>
                                    
                                    {!imagePreview ? (
                                        <div
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${
                                                isDragging 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                            }`}
                                        >
                                            <div className="text-center">
                                                <FiImage className="mx-auto text-4xl text-gray-400 mb-3" />
                                                <p className="text-sm text-gray-600 font-medium mb-1">
                                                    Click or drag image to upload
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    PNG, JPG up to 5MB
                                                </p>
                                            </div>
                                            <input 
                                                ref={fileInputRef}
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleImageChange} 
                                                className="hidden" 
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative group">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isFormValid}
                                    className={`w-full py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                                        isSubmitting || !isFormValid
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Adding Project...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiPlusCircle className="text-xl" />
                                            <span>Add Project</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Projects List */}
                    <div className="lg:col-span-2">
                        
                        {/* Filters and Search */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    Projects
                                    <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                        {filteredProjects.length}
                                    </span>
                                </h2>
                                
                                {/* View Toggle */}
                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded transition-all ${
                                            viewMode === "grid" 
                                                ? 'bg-white text-blue-600 shadow-sm' 
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <FiGrid className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded transition-all ${
                                            viewMode === "list" 
                                                ? 'bg-white text-blue-600 shadow-sm' 
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <FiList className="text-lg" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Category Filter */}
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-all bg-white"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === "all" ? "All Categories" : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Projects Display */}
                        {filteredProjects.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiImage className="text-4xl text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {searchTerm || selectedCategory !== "all" ? "No projects found" : "No projects yet"}
                                </h3>
                                <p className="text-gray-500">
                                    {searchTerm || selectedCategory !== "all" 
                                        ? "Try adjusting your filters" 
                                        : "Add your first project to get started"}
                                </p>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${
                                viewMode === "grid" 
                                    ? 'grid-cols-1 sm:grid-cols-2' 
                                    : 'grid-cols-1'
                            }`}>
                                {filteredProjects.map((proj) => (
                                    <div
                                        key={proj._id}
                                        className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                                    >
                                        {/* Image */}
                                        {proj.image && (
                                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                                <img
                                                    src={proj.image}
                                                    alt={proj.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                        {proj.title}
                                                    </h3>
                                                    {proj.category && (
                                                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                                                            <FiTag className="text-[10px]" />
                                                            {proj.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                                                {proj.description}
                                            </p>

                                            <p className="text-gray-400 text-xs mb-4">
                                                {new Date(proj.createdAt).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}
                                            </p>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setDeleteConfirm(proj._id)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all border border-red-200"
                                                >
                                                    <FiTrash2 />
                                                    Delete
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
                                Delete Project?
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                This action cannot be undone. The project will be permanently deleted.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
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

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default ProjectsAddPage;