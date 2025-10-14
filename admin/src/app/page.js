"use client";

import React from "react";
import { FaTasks, FaMoneyCheckAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAppContext } from "@/context/Context";

export default function DashboardCards() {
    const { mail, price, projects } = useAppContext();

    const data = [
        { 
            title: "Mails", 
            count: mail?.length || 0, 
            icon: <FaRegEnvelopeOpen size={36} />, 
            href: "/mails",
            description: "Unread messages"
        },
        { 
            title: "Projects", 
            count: projects?.length || 0, 
            icon: <FaTasks size={36} />, 
            href: "/projects",
            description: "Active projects"
        },
        { 
            title: "Prices", 
            count: price?.length || 0, 
            icon: <FaMoneyCheckAlt size={36} />, 
            href: "/prices",
            description: "Price entries"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto text-center mb-12"
            >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                    Quick glance at the key metrics of your system.
                </p>
            </motion.div>

            {/* Cards Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
                {data.map((item, index) => (
                    <motion.div key={item.title} variants={cardVariants}>
                        <Link href={item.href}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative flex flex-col items-center justify-center border-2 border-gray-200 rounded-2xl p-8 sm:p-10 bg-white shadow-md hover:shadow-2xl hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
                            >
                                {/* Gradient background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className="relative text-black mb-4 p-4 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300"
                                >
                                    {item.icon}
                                </motion.div>

                                {/* Count */}
                                <motion.h2
                                    initial={{ scale: 1 }}
                                    className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-2 tabular-nums"
                                >
                                    {item.count.toLocaleString()}
                                </motion.h2>

                                {/* Title */}
                                <p className="relative text-black text-xl sm:text-2xl font-semibold mb-1">
                                    {item.title}
                                </p>

                                {/* Description */}
                                <p className="relative text-gray-600 text-sm">
                                    {item.description}
                                </p>

                                {/* Arrow indicator */}
                                <motion.div
                                    initial={{ x: -5, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                    className="absolute bottom-4 right-4 text-gray-400 group-hover:text-black transition-colors duration-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </motion.div>

                                {/* Index badge (optional, remove if not needed) */}
                                <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-600">
                                        {index + 1}
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Optional: Add a footer message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="max-w-7xl mx-auto text-center mt-12"
            >
                <p className="text-gray-500 text-sm">
                    Last updated: {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </motion.div>
        </section>
    );
}