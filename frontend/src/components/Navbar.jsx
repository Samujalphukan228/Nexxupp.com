"use client";

import React, { useState, useEffect, memo, useCallback, useMemo, useRef } from "react";
import { X, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Work", href: "/work" },
    { 
        name: "Services", 
        href: "/services",
        dropdown: [
            { name: "Web Development", href: "/services/web" },
            { name: "Mobile Apps", href: "/services/mobile" },
            { name: "UI/UX Design", href: "/services/design" },
            { name: "Consulting", href: "/services/consulting" },
        ]
    },
    { name: "Pricing", href: "/pricing" },
];

// Desktop Dropdown with improved animations and hover delay
const DesktopDropdown = memo(({ items, isOpen }) => (
    <AnimatePresence mode="wait">
        {isOpen && (
            <>
                {/* Invisible bridge to maintain hover */}
                <div className="absolute top-full left-0 right-0 h-2" />
                
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ 
                        duration: 0.15,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                >
                    <div className="py-2">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <Link
                                    href={item.href}
                                    className="group flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200"
                                >
                                    <span className="font-medium">{item.name}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
));
DesktopDropdown.displayName = "DesktopDropdown";

// Desktop Nav Link with improved hover states
const NavLink = memo(({ link, isActive }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const timeoutRef = useRef(null);
    const hasDropdown = link.dropdown && link.dropdown.length > 0;

    const handleMouseEnter = useCallback(() => {
        if (hasDropdown) {
            clearTimeout(timeoutRef.current);
            setIsDropdownOpen(true);
        }
    }, [hasDropdown]);

    const handleMouseLeave = useCallback(() => {
        if (hasDropdown) {
            timeoutRef.current = setTimeout(() => {
                setIsDropdownOpen(false);
            }, 100);
        }
    }, [hasDropdown]);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={link.href}
                className={`
                    relative flex items-center gap-1 px-4 py-2 text-[15px] font-medium transition-all duration-200
                    ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}
                    group
                `}
            >
                <span>{link.name}</span>
                {hasDropdown && (
                    <ChevronDown className={`
                        w-4 h-4 transition-transform duration-200
                        ${isDropdownOpen ? 'rotate-180' : ''}
                        ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'}
                    `} />
                )}
                
                {/* Active indicator */}
                {isActive && (
                    <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-black"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                )}
            </Link>

            {hasDropdown && <DesktopDropdown items={link.dropdown} isOpen={isDropdownOpen} />}
        </div>
    );
});
NavLink.displayName = "NavLink";

// Mobile Submenu with collapsible animation
const MobileSubmenu = memo(({ items, isOpen }) => (
    <AnimatePresence initial={false}>
        {isOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="ml-4 space-y-1 py-2">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
));
MobileSubmenu.displayName = "MobileSubmenu";

// Mobile Menu with improved animations
const MobileMenu = memo(({ isOpen, onClose, pathname }) => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpanded = useCallback((href) => {
        setExpandedItems(prev => ({
            ...prev,
            [href]: !prev[href]
        }));
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 260 }}
                        className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <motion.h2 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg font-semibold"
                            >
                                Menu
                            </motion.h2>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:rotate-90"
                                aria-label="Close menu"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Scrollable Links */}
                        <nav className="flex-1 overflow-y-auto p-4">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="mb-1">
                                        {link.dropdown ? (
                                            <button
                                                onClick={() => toggleExpanded(link.href)}
                                                className={`
                                                    w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200
                                                    ${pathname === link.href 
                                                        ? 'bg-black text-white' 
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                    }
                                                `}
                                            >
                                                <span>{link.name}</span>
                                                <ChevronDown className={`
                                                    w-4 h-4 transition-transform duration-200
                                                    ${expandedItems[link.href] ? 'rotate-180' : ''}
                                                `} />
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={onClose}
                                                className={`
                                                    block px-4 py-3 rounded-lg font-medium transition-all duration-200
                                                    ${pathname === link.href 
                                                        ? 'bg-black text-white' 
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                    }
                                                `}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                        
                                        {link.dropdown && (
                                            <MobileSubmenu 
                                                items={link.dropdown} 
                                                isOpen={expandedItems[link.href]}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </nav>

                        {/* CTA */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 border-t border-gray-100"
                        >
                            <Link
                                href="/pricing"
                                onClick={onClose}
                                className="block w-full bg-black text-white text-center py-3 rounded-full font-medium hover:bg-gray-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Start a Project
                            </Link>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});
MobileMenu.displayName = "MobileMenu";

// Main Navbar with improved scroll behavior
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    // Improved scroll detection
    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollY = latest;
        const scrollDelta = currentScrollY - lastScrollY.current;
        
        setIsScrolled(currentScrollY > 10);
        
        // Show/hide logic with threshold
        if (currentScrollY < 10) {
            setIsVisible(true);
        } else if (scrollDelta > 3 && currentScrollY > 100) {
            setIsVisible(false);
        } else if (scrollDelta < -3) {
            setIsVisible(true);
        }
        
        lastScrollY.current = currentScrollY;
    });

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [isOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const closeMenu = useCallback(() => setIsOpen(false), []);
    const openMenu = useCallback(() => setIsOpen(true), []);

    return (
        <>
            <motion.nav
                className={`
                    fixed top-0 left-0 right-0 z-50 transition-all duration-300
                    ${isScrolled 
                        ? 'bg-white/80 backdrop-blur-xl shadow-sm' 
                        : 'bg-[#f9f9f9]'
                    }
                `}
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ 
                    duration: 0.3, 
                    ease: [0.16, 1, 0.3, 1]
                }}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight transition-transform duration-200 group-hover:scale-[1.02]">
                                NexxUpp
                            </h1>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.href}
                                    link={link}
                                    isActive={pathname === link.href || (link.dropdown && pathname.startsWith(link.href))}
                                />
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center">
                            <Link
                                href="/pricing"
                                className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Start a Project
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={openMenu}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
                            aria-label="Open menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            <MobileMenu 
                isOpen={isOpen} 
                onClose={closeMenu} 
                pathname={pathname}
            />
        </>
    );
};

export default Navbar;