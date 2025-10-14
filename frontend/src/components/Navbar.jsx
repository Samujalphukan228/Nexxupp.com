"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Work", href: "/work" },
    { name: "Prices", href: "/pricing" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLinkClick = () => setIsOpen(false);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f9]"
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6 sm:px-8 lg:px-12">
                {/* Brand */}
                <Link href="/" onClick={handleLinkClick}>
                    <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight cursor-pointer hover:opacity-70 transition-opacity duration-300">
                        NexxUpp
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isHovered = hoveredLink === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={handleLinkClick}
                                onMouseEnter={() => setHoveredLink(link.href)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="relative px-1 py-2 text-[15px] font-medium text-gray-600 hover:text-black transition-all duration-300"
                            >
                                {link.name}
                                <motion.span
                                    className="absolute left-0 bottom-0 h-[2px] bg-black"
                                    initial={{ width: "0%" }}
                                    animate={{ width: isHovered ? "100%" : "0%" }}
                                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                />
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 text-gray-700 hover:text-black transition-all duration-300"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={toggleMenu}
                        />

                        {/* Side Menu with Rounded Corners */}
                        <motion.div
                            className="fixed top-0 right-0 w-80 h-screen bg-white z-50 p-8 flex flex-col lg:hidden shadow-2xl rounded-l-3xl"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ 
                                duration: 0.4, 
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-xl font-semibold text-black">Menu</h2>
                                <button
                                    onClick={toggleMenu}
                                    className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300"
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Links */}
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ 
                                            delay: 0.1 + index * 0.05,
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={handleLinkClick}
                                            className="block px-5 py-3.5 text-gray-700 text-base font-medium hover:text-black hover:bg-gray-50 rounded-xl transition-all duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* CTA */}
                            <motion.div 
                                className="mt-auto"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <button className="w-full bg-black text-white py-3.5 rounded-full text-sm font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    Get Started
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;