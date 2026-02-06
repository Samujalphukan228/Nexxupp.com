"use client";

import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import { X, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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

// Desktop Dropdown with Enhanced GSAP animations
const DesktopDropdown = memo(({ items, isOpen }) => {
    const dropdownRef = useRef(null);
    const itemsRef = useRef([]);

    useGSAP(() => {
        if (isOpen && dropdownRef.current) {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            tl.fromTo(
                dropdownRef.current,
                {
                    opacity: 0,
                    y: -20,
                    scale: 0.92,
                    transformOrigin: "top center"
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }
            );

            tl.fromTo(
                itemsRef.current,
                {
                    opacity: 0,
                    x: -15
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    ease: "power3.out"
                },
                "-=0.3"
            );
        } else if (dropdownRef.current) {
            gsap.to(dropdownRef.current, {
                opacity: 0,
                y: -10,
                scale: 0.95,
                duration: 0.25,
                ease: "power2.in"
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Invisible bridge */}
            <div className="absolute top-full left-0 right-0 h-4" />
            
            <div
                ref={dropdownRef}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden z-50"
            >
                <div className="py-3 px-2">
                    {items.map((item, index) => (
                        <div
                            key={item.href}
                            ref={(el) => (itemsRef.current[index] = el)}
                        >
                            <Link
                                href={item.href}
                                className="group flex items-center justify-between px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50/80 rounded-xl transition-all duration-300"
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        x: 4,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    });
                                    gsap.to(e.currentTarget.querySelector('.chevron'), {
                                        x: 5,
                                        duration: 0.4,
                                        ease: "back.out(2)"
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        x: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    });
                                    gsap.to(e.currentTarget.querySelector('.chevron'), {
                                        x: 0,
                                        duration: 0.4,
                                        ease: "power2.out"
                                    });
                                }}
                            >
                                <span className="font-medium tracking-wide">{item.name}</span>
                                <ChevronRight className="chevron w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors duration-300" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});
DesktopDropdown.displayName = "DesktopDropdown";

// Desktop Nav Link with Enhanced GSAP animations
const NavLink = memo(({ link, isActive }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const timeoutRef = useRef(null);
    const indicatorRef = useRef(null);
    const chevronRef = useRef(null);
    const linkRef = useRef(null);
    const hasDropdown = link.dropdown && link.dropdown.length > 0;

    useGSAP(() => {
        if (isActive && indicatorRef.current) {
            gsap.fromTo(
                indicatorRef.current,
                { scaleX: 0, transformOrigin: "left" },
                { 
                    scaleX: 1, 
                    duration: 0.6, 
                    ease: "elastic.out(1, 0.5)" 
                }
            );
        }
    }, [isActive]);

    useEffect(() => {
        if (chevronRef.current) {
            gsap.to(chevronRef.current, {
                rotate: isDropdownOpen ? 180 : 0,
                duration: 0.4,
                ease: "power2.inOut"
            });
        }
    }, [isDropdownOpen]);

    const handleMouseEnter = useCallback(() => {
        if (hasDropdown) {
            clearTimeout(timeoutRef.current);
            setIsDropdownOpen(true);
        }
        if (linkRef.current) {
            gsap.to(linkRef.current, {
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [hasDropdown]);

    const handleMouseLeave = useCallback(() => {
        if (hasDropdown) {
            timeoutRef.current = setTimeout(() => {
                setIsDropdownOpen(false);
            }, 200);
        }
        if (linkRef.current) {
            gsap.to(linkRef.current, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
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
                ref={linkRef}
                className={`
                    relative flex items-center gap-1.5 px-5 py-2.5 text-[15px] font-medium transition-all duration-300
                    ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}
                    group
                `}
            >
                <span className="tracking-wide">{link.name}</span>
                {hasDropdown && (
                    <ChevronDown 
                        ref={chevronRef}
                        className={`
                            w-4 h-4 transition-colors duration-300
                            ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'}
                        `} 
                    />
                )}
                
                {/* Active indicator */}
                {isActive && (
                    <div
                        ref={indicatorRef}
                        className="absolute bottom-0 left-5 right-5 h-[2px] bg-black rounded-full"
                    />
                )}
            </Link>

            {hasDropdown && <DesktopDropdown items={link.dropdown} isOpen={isDropdownOpen} />}
        </div>
    );
});
NavLink.displayName = "NavLink";

// Mobile Submenu with Enhanced GSAP animations
const MobileSubmenu = memo(({ items, isOpen }) => {
    const submenuRef = useRef(null);
    const itemsRef = useRef([]);

    useGSAP(() => {
        if (isOpen && submenuRef.current) {
            const tl = gsap.timeline();
            
            tl.fromTo(
                submenuRef.current,
                { height: 0, opacity: 0 },
                { 
                    height: "auto", 
                    opacity: 1, 
                    duration: 0.5,
                    ease: "power3.out"
                }
            );

            tl.fromTo(
                itemsRef.current,
                { x: -25, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "back.out(1.7)"
                },
                "-=0.3"
            );
        } else if (submenuRef.current) {
            gsap.to(submenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.35,
                ease: "power2.inOut"
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={submenuRef}
            className="overflow-hidden"
            style={{ height: 0 }}
        >
            <div className="ml-4 space-y-1.5 py-3">
                {items.map((item, index) => (
                    <div
                        key={item.href}
                        ref={(el) => (itemsRef.current[index] = el)}
                    >
                        <Link
                            href={item.href}
                            className="block px-5 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
});
MobileSubmenu.displayName = "MobileSubmenu";

// Mobile Menu - Full Screen with Margins
const MobileMenu = memo(({ isOpen, onClose, pathname }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const backdropRef = useRef(null);
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const navItemsRef = useRef([]);
    const ctaRef = useRef(null);

    useGSAP(() => {
        if (isOpen) {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            // Backdrop animation
            tl.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4 }
            );

            // Menu slide in with scale
            tl.fromTo(
                menuRef.current,
                { 
                    x: "100%",
                    scale: 0.95,
                    opacity: 0
                },
                { 
                    x: 0, 
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power4.out"
                },
                "-=0.2"
            );

            // Header animation
            tl.fromTo(
                headerRef.current,
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.4"
            );

            // Nav items stagger
            tl.fromTo(
                navItemsRef.current,
                { x: 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                },
                "-=0.4"
            );

            // CTA button
            tl.fromTo(
                ctaRef.current,
                { y: 30, opacity: 0, scale: 0.9 },
                { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(2)"
                },
                "-=0.3"
            );
        } else if (backdropRef.current && menuRef.current) {
            const tl = gsap.timeline();
            
            tl.to(menuRef.current, {
                x: "100%",
                scale: 0.95,
                opacity: 0,
                duration: 0.5,
                ease: "power3.in"
            });

            tl.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3
            }, "-=0.3");
        }
    }, [isOpen]);

    const toggleExpanded = useCallback((href) => {
        setExpandedItems(prev => ({
            ...prev,
            [href]: !prev[href]
        }));
    }, []);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop with blur */}
            <div
                ref={backdropRef}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                onClick={onClose}
            />

            {/* Full Screen Menu with Margins */}
            <div
                ref={menuRef}
                className="fixed inset-4 sm:inset-6 md:left-auto md:right-6 md:w-[420px] bg-[#f9f9f9]/98 backdrop-blur-2xl z-[101] shadow-2xl flex flex-col rounded-3xl overflow-hidden border border-gray-200/50"
            >
                {/* Header */}
                <div 
                    ref={headerRef}
                    className="flex items-center justify-between p-8 border-b border-gray-200/60"
                >
                    <h2 className="text-xl font-semibold tracking-tight">Menu</h2>
                    <button
                        onClick={onClose}
                        className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                rotate: 90,
                                scale: 1.1,
                                duration: 0.4,
                                ease: "back.out(2)"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                rotate: 0,
                                scale: 1,
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        }}
                        aria-label="Close menu"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Scrollable Links */}
                <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                    {navLinks.map((link, index) => (
                        <div
                            key={link.href}
                            ref={(el) => (navItemsRef.current[index] = el)}
                        >
                            {link.dropdown ? (
                                <button
                                    onClick={() => toggleExpanded(link.href)}
                                    className={`
                                        w-full flex items-center justify-between px-6 py-4 rounded-2xl font-medium transition-all duration-300
                                        ${pathname === link.href 
                                            ? 'bg-black text-white shadow-lg' 
                                            : 'text-gray-700 hover:bg-gray-100/80'
                                        }
                                    `}
                                >
                                    <span className="tracking-wide">{link.name}</span>
                                    <ChevronDown 
                                        className="w-5 h-5 transition-transform duration-400"
                                        style={{
                                            transform: expandedItems[link.href] ? 'rotate(180deg)' : 'rotate(0deg)'
                                        }}
                                    />
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className={`
                                        block px-6 py-4 rounded-2xl font-medium transition-all duration-300
                                        ${pathname === link.href 
                                            ? 'bg-black text-white shadow-lg' 
                                            : 'text-gray-700 hover:bg-gray-100/80'
                                        }
                                    `}
                                >
                                    <span className="tracking-wide">{link.name}</span>
                                </Link>
                            )}
                            
                            {link.dropdown && (
                                <MobileSubmenu 
                                    items={link.dropdown} 
                                    isOpen={expandedItems[link.href]}
                                />
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTA */}
                <div 
                    ref={ctaRef}
                    className="p-8 border-t border-gray-200/60"
                >
                    <Link
                        href="/pricing"
                        onClick={onClose}
                        className="block w-full bg-black text-white text-center py-4 rounded-2xl font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1.02,
                                y: -2,
                                duration: 0.3,
                                ease: "back.out(2)"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1,
                                y: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                    >
                        <span className="tracking-wide">Start a Project</span>
                    </Link>
                </div>
            </div>
        </>
    );
});
MobileMenu.displayName = "MobileMenu";

// Main Navbar with Floating Design and Margins
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const navRef = useRef(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollDelta = currentScrollY - lastScrollY.current;
                    
                    setIsScrolled(currentScrollY > 20);
                    
                    // Show/hide logic
                    if (currentScrollY < 20) {
                        setIsVisible(true);
                    } else if (scrollDelta > 5 && currentScrollY > 100) {
                        setIsVisible(false);
                    } else if (scrollDelta < -5) {
                        setIsVisible(true);
                    }
                    
                    lastScrollY.current = currentScrollY;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        if (navRef.current) {
            gsap.to(navRef.current, {
                y: isVisible ? 0 : -120,
                duration: 0.6,
                ease: "power3.inOut"
            });
        }
    }, [isVisible]);

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
            <nav
                ref={navRef}
                className={`
                    fixed top-0 left-0 right-0 z-50 transition-all duration-500
                    ${isScrolled 
                        ? 'pt-4 sm:pt-6' 
                        : 'pt-0'
                    }
                `}
            >
                <div className={`
                    max-w-7xl mx-auto transition-all duration-500
                    ${isScrolled 
                        ? 'px-4 sm:px-6 lg:px-8' 
                        : 'px-0'
                    }
                `}>
                    <div className={`
                        flex items-center justify-between h-20 px-6 sm:px-8 lg:px-12 transition-all duration-500
                        ${isScrolled 
                            ? 'bg-white/90 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-2xl border border-gray-200/50' 
                            : 'bg-[#f9f9f9]'
                        }
                    `}>
                        {/* Logo */}
                        <Link 
                            href="/" 
                            className="flex items-center group relative z-10"
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget.querySelector('h1'), {
                                    scale: 1.05,
                                    duration: 0.4,
                                    ease: "back.out(2)"
                                });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget.querySelector('h1'), {
                                    scale: 1,
                                    duration: 0.4,
                                    ease: "power2.out"
                                });
                            }}
                        >
                            <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                                NexxUpp
                            </h1>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-2">
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
                                className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1.05,
                                        y: -2,
                                        duration: 0.3,
                                        ease: "back.out(2)"
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1,
                                        y: 0,
                                        duration: 0.3,
                                        ease: "power2.out"
                                    });
                                }}
                            >
                                <span className="tracking-wide">Start a Project</span>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={openMenu}
                            className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-all duration-300"
                            onMouseDown={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 0.9,
                                    duration: 0.15
                                });
                            }}
                            onMouseUp={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1,
                                    duration: 0.3,
                                    ease: "back.out(2)"
                                });
                            }}
                            aria-label="Open menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenu 
                isOpen={isOpen} 
                onClose={closeMenu} 
                pathname={pathname}
            />
        </>
    );
};

export default Navbar;