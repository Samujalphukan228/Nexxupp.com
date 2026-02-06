"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Mail, MapPin, ArrowRight, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const footerLinks = {
    company: {
        name: "NexxUpp",
        description: "Building modern web experiences with style and simplicity.",
        tagline: "Crafting digital excellence",
        address: "Assam, India",
        email: "contact@nexxupp.com",
    },
    quickLinks: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Pricing", href: "/pricing" },
    ],
    services: [
        { name: "Web Development", href: "/services/web" },
        { name: "Mobile Apps", href: "/services/mobile" },
        { name: "UI/UX Design", href: "/services/design" },
        { name: "Consulting", href: "/services/consulting" },
    ],
    legal: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
    ],
    social: [
        { icon: Twitter, href: "https://x.com/nexxupp110286", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
        { icon: Facebook, href: "https://www.facebook.com/Nexxupp/", label: "Facebook", color: "hover:bg-[#1877F2]" },
        { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
    ],
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Subcomponents
const SectionTitle = memo(({ children }) => (
    <h3 className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-gray-500 font-semibold mb-5 sm:mb-6">
        {children}
    </h3>
));
SectionTitle.displayName = "SectionTitle";

const FooterLink = memo(({ href, children, external = false }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <Link
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="group relative text-[14px] sm:text-[15px] text-gray-600 hover:text-black transition-colors duration-300 font-light inline-flex items-center gap-2"
        >
            <span className="relative">
                {children}
                <motion.span
                    className="absolute bottom-0 left-0 h-[1px] bg-black"
                    initial={{ width: 0 }}
                    whileHover={!prefersReducedMotion ? { width: "100%" } : {}}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            </span>
            <ArrowRight 
                size={14} 
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
            />
        </Link>
    );
});
FooterLink.displayName = "FooterLink";

const SocialLink = memo(({ href, icon: Icon, label, color }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-transparent group transition-all duration-300 ${color}`}
            whileHover={!prefersReducedMotion ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
        >
            <Icon size={18} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
        </motion.a>
    );
});
SocialLink.displayName = "SocialLink";

const NewsletterSection = memo(() => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const prefersReducedMotion = useReducedMotion();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <motion.div variants={itemVariants} className="space-y-5">
            <SectionTitle>Stay Updated</SectionTitle>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-600 font-light max-w-xs">
                Subscribe to our newsletter for the latest updates and insights.
            </p>
            
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        disabled={status === "loading" || status === "success"}
                        className="w-full px-5 py-3.5 sm:py-4 pr-12 rounded-full border-2 border-gray-200 bg-white/50 backdrop-blur-sm text-[13px] sm:text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all duration-300 disabled:opacity-60"
                        required
                    />
                    <motion.button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center disabled:opacity-60 transition-all duration-300"
                        whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                        whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                    >
                        {status === "loading" ? (
                            <motion.div
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        ) : status === "success" ? (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <Send size={16} className="text-white" />
                        )}
                    </motion.button>
                </div>
                
                {status === "success" && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[12px] text-green-600 mt-2 font-medium"
                    >
                        ✓ Successfully subscribed!
                    </motion.p>
                )}
            </form>
        </motion.div>
    );
});
NewsletterSection.displayName = "NewsletterSection";

const CompanyInfo = memo(() => (
    <motion.div variants={itemVariants} className="space-y-5 lg:col-span-1">
        <div className="space-y-3">
            <h2 className="text-[2rem] sm:text-[2.5rem] font-light tracking-tight text-black">
                {footerLinks.company.name}
            </h2>
            <div className="flex items-center gap-3">
                <div className="w-16 h-[2px] bg-gradient-to-r from-black via-gray-400 to-transparent"></div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
                    {footerLinks.company.tagline}
                </span>
            </div>
        </div>
        
        <p className="text-[14px] sm:text-[15px] leading-[1.8] text-gray-600 font-light max-w-sm">
            {footerLinks.company.description}
        </p>
        
        <div className="space-y-3 text-[13px] sm:text-[14px] text-gray-500 font-light pt-2">
            <motion.div 
                className="flex items-start gap-3 hover:text-gray-800 transition-colors duration-300 cursor-pointer"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
            >
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <p>{footerLinks.company.address}</p>
            </motion.div>
            <motion.div 
                className="flex items-start gap-3 hover:text-gray-800 transition-colors duration-300"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
            >
                <Mail size={16} className="flex-shrink-0 mt-0.5" />
                <a 
                    href={`mailto:${footerLinks.company.email}`} 
                    className="hover:underline underline-offset-2"
                >
                    {footerLinks.company.email}
                </a>
            </motion.div>
        </div>
    </motion.div>
));
CompanyInfo.displayName = "CompanyInfo";

const LinksSection = memo(({ title, links }) => (
    <motion.div variants={itemVariants} className="space-y-5">
        <SectionTitle>{title}</SectionTitle>
        <nav>
            <ul className="space-y-3.5">
                {links.map((link) => (
                    <li key={link.href}>
                        <FooterLink href={link.href}>{link.name}</FooterLink>
                    </li>
                ))}
            </ul>
        </nav>
    </motion.div>
));
LinksSection.displayName = "LinksSection";

const SocialSection = memo(() => (
    <motion.div variants={itemVariants} className="space-y-5">
        <SectionTitle>Connect With Us</SectionTitle>
        <div className="flex items-center gap-3 flex-wrap">
            {footerLinks.social.map((social) => (
                <SocialLink
                    key={social.label}
                    href={social.href}
                    icon={social.icon}
                    label={social.label}
                    color={social.color}
                />
            ))}
        </div>
        <p className="text-[13px] sm:text-[14px] text-gray-500 font-light leading-relaxed pt-2">
            Join our community and stay connected with the latest updates, insights, and innovations.
        </p>
    </motion.div>
));
SocialSection.displayName = "SocialSection";

const Divider = memo(() => (
    <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-6 mb-14 sm:mb-20"
    >
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-gray-200"></div>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2"
        >
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-400">
                Connect
            </span>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        </motion.div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-300 to-gray-200"></div>
    </motion.div>
));
Divider.displayName = "Divider";

const BottomBar = memo(() => (
    <motion.div
        variants={itemVariants}
        className="mt-20 sm:mt-24 pt-10 sm:pt-12 border-t border-gray-200"
    >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="text-[12px] sm:text-[13px] text-gray-500 font-light">
                    &copy; {new Date().getFullYear()} <span className="font-medium text-gray-700">{footerLinks.company.name}</span>. All rights reserved.
                </p>
                <span className="hidden sm:block text-gray-300">•</span>
                <p className="text-[11px] sm:text-[12px] text-gray-400 font-light">
                    Designed & Developed with <span className="text-red-500">♥</span> by NexxUpp Team
                </p>
            </div>

            {/* Back to top */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-gray-600 hover:text-black font-medium transition-colors duration-300"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <span className="tracking-wide">Back to Top</span>
                <svg 
                    className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </motion.button>
        </div>

        {/* Trust badges */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
            <div className="text-center px-4">
                <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-1">Trusted by</p>
                <p className="text-[14px] font-semibold text-gray-700">50+ Clients</p>
            </div>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <div className="text-center px-4">
                <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-1">Projects</p>
                <p className="text-[14px] font-semibold text-gray-700">100+ Completed</p>
            </div>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <div className="text-center px-4">
                <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-1">Rating</p>
                <p className="text-[14px] font-semibold text-gray-700">4.9/5.0 ⭐</p>
            </div>
        </motion.div>
    </motion.div>
));
BottomBar.displayName = "BottomBar";

// Main Footer Component
const Footer = () => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <footer className="relative bg-gradient-to-b from-gray-50/80 to-white pt-20 sm:pt-28 pb-10 sm:pb-14 overflow-hidden">
            {/* Animated Background Gradient */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-transparent to-gray-50/30 pointer-events-none"
            />
            
            {/* Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />
            
            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
                <Divider />

                {/* Main Grid */}
                <motion.div
                    variants={prefersReducedMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8"
                >
                    <div className="lg:col-span-4">
                        <CompanyInfo />
                    </div>
                    
                    <div className="lg:col-span-2">
                        <LinksSection title="Quick Links" links={footerLinks.quickLinks} />
                    </div>
                    
                    <div className="lg:col-span-2">
                        <LinksSection title="Services" links={footerLinks.services} />
                    </div>
                    
                    <div className="lg:col-span-2">
                        <LinksSection title="Legal" links={footerLinks.legal} />
                    </div>
                    
                    <div className="lg:col-span-2">
                        <SocialSection />
                    </div>
                </motion.div>

                {/* Newsletter Section */}
                <motion.div
                    variants={prefersReducedMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 sm:mt-20 max-w-2xl mx-auto"
                >
                    <NewsletterSection />
                </motion.div>

                <BottomBar />
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.04, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-black via-gray-800 to-transparent rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-gray-600 via-gray-400 to-transparent rounded-full blur-3xl pointer-events-none"
            />
        </footer>
    );
};

export default memo(Footer);