"use client";

import React, { useState, useMemo } from "react";
import { useAppContext } from "@/context/Context";

const QueriesPage = () => {
    const { mail, removeQuery } = useAppContext(); // Added removeQuery
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPlan, setFilterPlan] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [deletingId, setDeletingId] = useState(null); // Track loading state

    // Get unique plan categories for filter
    const planCategories = useMemo(() => {
        const categories = mail
            .filter(query => query.priceCard)
            .map(query => query.priceCard.category);
        return ["all", ...new Set(categories)];
    }, [mail]);

    // Filter and sort queries
    const filteredQueries = useMemo(() => {
        let filtered = [...mail];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                query =>
                    query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    query.message.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Plan filter
        if (filterPlan !== "all") {
            filtered = filtered.filter(
                query => query.priceCard?.category === filterPlan
            );
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === "oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortBy === "email") {
                return a.email.localeCompare(b.email);
            }
            return 0;
        });

        return filtered;
    }, [mail, searchTerm, filterPlan, sortBy]);

    // Handle delete with confirmation
    const handleDelete = async (id, email) => {
        if (window.confirm(`Are you sure you want to delete the query from ${email}?`)) {
            setDeletingId(id);
            await removeQuery(id);
            setDeletingId(null);
        }
    };

    // Export to CSV
    const exportToCSV = () => {
        const headers = ["#", "Email", "Message", "Plan", "Price", "Date"];
        const csvData = filteredQueries.map((query, index) => [
            index + 1,
            query.email,
            query.message.replace(/,/g, ";"),
            query.priceCard?.category || "N/A",
            query.priceCard?.price || "N/A",
            new Date(query.createdAt).toLocaleString(),
        ]);

        const csv = [
            headers.join(","),
            ...csvData.map(row => row.join(",")),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `queries-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    const formatDate = (date) => {
        const now = new Date();
        const queryDate = new Date(date);
        const diffInHours = (now - queryDate) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return "Just now";
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else if (diffInHours < 48) {
            return "Yesterday";
        } else {
            return queryDate.toLocaleDateString();
        }
    };

    return (
        <section className=" py-12 sm:py-16 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Customer Queries
                                </h1>
                                <span className="text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                                    {filteredQueries.length}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Manage and respond to customer inquiries
                            </p>
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={exportToCSV}
                            disabled={filteredQueries.length === 0}
                            className="self-start sm:self-auto inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="hidden sm:inline">Export CSV</span>
                            <span className="sm:hidden">Export</span>
                        </button>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            
                            {/* Search */}
                            <div className="lg:col-span-2">
                                <div className="relative">
                                    <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search by email or message..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Filter by Plan */}
                            <div>
                                <select
                                    value={filterPlan}
                                    onChange={(e) => setFilterPlan(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base appearance-none bg-white cursor-pointer"
                                >
                                    {planCategories.map((category) => (
                                        <option key={category} value={category}>
                                            {category === "all" ? "All Plans" : category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base appearance-none bg-white cursor-pointer"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="email">By Email</option>
                                </select>
                            </div>

                        </div>

                        {/* Active Filters Display */}
                        {(searchTerm || filterPlan !== "all") && (
                            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                <span className="text-xs sm:text-sm text-gray-600 font-medium">Active filters:</span>
                                {searchTerm && (
                                    <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                        Search: {searchTerm}
                                        <button onClick={() => setSearchTerm("")} className="hover:text-blue-900">×</button>
                                    </span>
                                )}
                                {filterPlan !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                        Plan: {filterPlan}
                                        <button onClick={() => setFilterPlan("all")} className="hover:text-purple-900">×</button>
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setFilterPlan("all");
                                    }}
                                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 font-medium underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Queries List */}
                {filteredQueries.length === 0 ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-12 sm:p-16 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                {searchTerm || filterPlan !== "all" ? "No matches found" : "No queries yet"}
                            </h3>
                            <p className="text-gray-500 text-sm sm:text-base mb-6">
                                {searchTerm || filterPlan !== "all"
                                    ? "Try adjusting your filters or search terms"
                                    : "Customer inquiries will appear here when submitted"}
                            </p>
                            {(searchTerm || filterPlan !== "all") && (
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setFilterPlan("all");
                                    }}
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all duration-300"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-5">
                        {filteredQueries.map((query, index) => (
                            <div
                                key={query._id}
                                className="group relative bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-7 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Delete Button - Top Right Corner */}
                                <button
                                    onClick={() => handleDelete(query._id, query.email)}
                                    disabled={deletingId === query._id}
                                    className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 sm:p-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg sm:rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed group/delete"
                                    title="Delete query"
                                >
                                    {deletingId === query._id ? (
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    )}
                                </button>

                                {/* Top Row */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-5 pr-10 sm:pr-12">
                                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                        {/* Index Badge */}
                                        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-md">
                                            {index + 1}
                                        </span>

                                        {/* Email */}
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 flex-1 sm:flex-initial min-w-0">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                            <span className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                                {query.email}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 self-start">
                                        <svg className="w-4 h-4 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">
                                            {formatDate(query.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="mb-4 sm:mb-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-200">
                                    <div className="flex items-start gap-2 sm:gap-3 mb-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">Message</span>
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-6 sm:pl-8 break-words">
                                        {query.message}
                                    </p>
                                </div>

                                {/* Plan Info */}
                                {query.priceCard && (
                                    <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-blue-200">
                                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                                <h4 className="text-base sm:text-lg font-bold text-gray-900">
                                                    {query.priceCard.category}
                                                </h4>
                                                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-sm sm:text-base shadow-md">
                                                    <span className="text-xs sm:text-sm">$</span>
                                                    {query.priceCard.price}
                                                    <span className="text-xs opacity-90">/mo</span>
                                                </span>
                                            </div>
                                            {query.priceCard.description && (
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                                                    {query.priceCard.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default QueriesPage;