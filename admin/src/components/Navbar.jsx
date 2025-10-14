"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/Context";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const { token, logout } = useAppContext();

    const sideMenuVariants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
        exit: { x: "100%" },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const navLinks = [
        { name: "Mails", href: "/mails" },
        { name: "Projects", href: "/projects" },
        { name: "Prices", href: "/prices" },
    ];

    if (!token) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
            <div className="flex items-center justify-between py-5 px-6 sm:px-12 max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
                        NexxUpp Admin
                    </Link>
                </h1>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6">
                    <Button 
                        onClick={logout} 
                        className="bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2.5 rounded-xl font-medium"
                    >
                        Log Out
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-300 hover:shadow-md active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} className="text-gray-900" /> : <Menu size={24} className="text-gray-900" />}
                    </button>
                </div>
            </div>

            {/* Mobile Side Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Blur Overlay - starts below navbar */}
                        <motion.div
                            className="fixed top-[73px] left-0 right-0 bottom-0 bg-black/60 backdrop-blur-md z-40"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={overlayVariants}
                            transition={{ duration: 0.25 }}
                            onClick={toggleMenu}
                        />

                        <motion.div
                            className="lg:hidden bg-gradient-to-br from-white to-gray-50 w-72 h-screen fixed top-0 right-0 shadow-2xl z-50 p-8 flex flex-col rounded-l-3xl border-l border-gray-200/50"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sideMenuVariants}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button
                                onClick={toggleMenu}
                                className="text-gray-900 mb-8 self-end p-2.5 rounded-xl hover:bg-white/80 hover:shadow-md transition-all duration-300 active:scale-95"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col justify-between flex-1">
                                <nav className="flex flex-col gap-3">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="block px-6 py-3.5 rounded-xl text-gray-900 text-base font-medium hover:bg-white hover:shadow-md transition-all duration-300 active:scale-98 border border-transparent hover:border-gray-200/50"
                                                onClick={toggleMenu}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8"
                                >
                                    <Button 
                                        onClick={logout} 
                                        className="w-full bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 py-3.5 rounded-xl font-medium active:scale-98"
                                    >
                                        Log Out
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;