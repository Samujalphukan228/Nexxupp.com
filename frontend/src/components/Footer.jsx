"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Facebook  } from "lucide-react";

const footerLinks = {
    company: {
        name: "NexxUpp",
        description: "Building modern web experiences with style and simplicity.",
        address: "Assam, India",
        email: "contact@nexxupp.com",
    },
    quickLinks: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Pricing", href: "/pricing" },
    ],
    legal: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
    ],
    social: [
        { icon: <Twitter size={18} />, href: "https://x.com/nexxupp110286" },
        { icon: <Facebook size={18} />, href: "https://www.facebook.com/Nexxupp/" },
        // { icon: <Linkedin size={18} />, href: "https://linkedin.com" },
    ],
};

const Footer = () => {
    return (
        <footer className=" text-gray-700 pt-16 sm:pt-20 pb-8 sm:pb-12">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
                
                {/* Top Divider */}
                <div className="flex items-center gap-4 mb-12 sm:mb-16">
                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                    <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400">
                        Connect
                    </span>
                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                    
                    {/* Company Info */}
                    <div className="space-y-4 lg:col-span-1">
                        <div>
                            <h2 className="text-[1.5rem] sm:text-[2rem] font-light tracking-tight text-black mb-3">
                                {footerLinks.company.name}
                            </h2>
                            <div className="w-12 h-[1px] bg-gray-300 mb-4"></div>
                        </div>
                        <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-500 font-light">
                            {footerLinks.company.description}
                        </p>
                        <div className="space-y-1 text-[12px] sm:text-[13px] text-gray-400 font-light">
                            <p>{footerLinks.company.address}</p>
                            <p>{footerLinks.company.email}</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gray-600 font-semibold mb-4">
                                Quick Links
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] sm:text-[14px] text-gray-500 hover:text-black transition-colors duration-500 ease-out font-light"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gray-600 font-semibold mb-4">
                                Legal
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] sm:text-[14px] text-gray-500 hover:text-black transition-colors duration-500 ease-out font-light"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social & Contact */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gray-600 font-semibold mb-4">
                                Follow Us
                            </h3>
                        </div>
                        <div className="flex items-center gap-4">
                            {footerLinks.social.map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:scale-105 transition-all duration-500 ease-out group"
                                >
                                    <span className="text-gray-500 group-hover:text-black transition-colors duration-500">
                                        {social.icon}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <p className="text-[12px] sm:text-[13px] text-gray-400 font-light">
                            &copy; {new Date().getFullYear()} {footerLinks.company.name}. All rights reserved.
                        </p>
                        <p className="text-[11px] sm:text-[12px] text-gray-400 font-light">
                            Designed & Developed by NexxUpp Team
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;