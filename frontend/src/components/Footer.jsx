"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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
        { icon: Twitter, href: "https://x.com/nexxupp110286", label: "Twitter" },
        { icon: Facebook, href: "https://www.facebook.com/Nexxupp/", label: "Facebook" },
        // { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    ],
};

// Subcomponents
const SectionTitle = memo(({ children }) => (
    <h3 className="text-[11px] tracking-[0.2em] uppercase text-gray-600 font-semibold mb-4">
        {children}
    </h3>
));
SectionTitle.displayName = "SectionTitle";

const FooterLink = memo(({ href, children, external = false }) => (
    <Link
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group relative text-[13px] sm:text-[14px] text-gray-500 hover:text-black transition-colors duration-300 font-light inline-block"
    >
        <span className="relative">
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>
    </Link>
));
FooterLink.displayName = "FooterLink";

const SocialLink = memo(({ href, icon: Icon, label }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black group transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
    >
        <Icon size={18} className="text-gray-500 group-hover:text-white transition-colors duration-300" />
    </motion.a>
));
SocialLink.displayName = "SocialLink";

const CompanyInfo = memo(() => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 lg:col-span-1"
    >
        <div>
            <h2 className="text-[1.5rem] sm:text-[2rem] font-light tracking-tight text-black mb-3">
                {footerLinks.company.name}
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-r from-black to-gray-300"></div>
        </div>
        <p className="text-[13px] sm:text-[14px] leading-[1.8] text-gray-500 font-light max-w-xs">
            {footerLinks.company.description}
        </p>
        <div className="space-y-2 text-[12px] sm:text-[13px] text-gray-400 font-light">
            <div className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                <MapPin size={14} className="flex-shrink-0" />
                <p>{footerLinks.company.address}</p>
            </div>
            <div className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                <Mail size={14} className="flex-shrink-0" />
                <a href={`mailto:${footerLinks.company.email}`} className="hover:underline">
                    {footerLinks.company.email}
                </a>
            </div>
        </div>
    </motion.div>
));
CompanyInfo.displayName = "CompanyInfo";

const LinksSection = memo(({ title, links, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="space-y-4"
    >
        <SectionTitle>{title}</SectionTitle>
        <nav>
            <ul className="space-y-3">
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
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
    >
        <SectionTitle>Follow Us</SectionTitle>
        <div className="flex items-center gap-3">
            {footerLinks.social.map((social, idx) => (
                <SocialLink
                    key={idx}
                    href={social.href}
                    icon={social.icon}
                    label={social.label}
                />
            ))}
        </div>
        <p className="text-[12px] text-gray-400 font-light mt-4">
            Join our community and stay updated with the latest news.
        </p>
    </motion.div>
));
SocialSection.displayName = "SocialSection";

const Divider = memo(() => (
    <div className="flex items-center gap-4 mb-12 sm:mb-16">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400"
        >
            Connect
        </motion.span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
));
Divider.displayName = "Divider";

const BottomBar = memo(() => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-200"
    >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <p className="text-[12px] sm:text-[13px] text-gray-400 font-light">
                &copy; {new Date().getFullYear()} {footerLinks.company.name}. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[11px] sm:text-[12px] text-gray-400">
                <p className="font-light">Designed & Developed by NexxUpp Team</p>
                <span className="hidden sm:block">•</span>
            </div>
        </div>
    </motion.div>
));
BottomBar.displayName = "BottomBar";

// Main Footer Component
const Footer = () => {
    return (
        <footer className="relative text-gray-700 pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none"></div>
            
            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8">
                <Divider />

                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                    <CompanyInfo />
                    <LinksSection title="Quick Links" links={footerLinks.quickLinks} delay={0.1} />
                    <LinksSection title="Legal" links={footerLinks.legal} delay={0.2} />
                    <SocialSection />
                </div>

                <BottomBar />
            </div>

            {/* Decorative Element */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.03 }}
                viewport={{ once: true }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-black to-transparent rounded-full blur-3xl pointer-events-none"
            />
        </footer>
    );
};

export default Footer;