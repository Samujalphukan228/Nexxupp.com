"use client";

import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const sections = [
    {
        id: "1",
        title: "Information We Collect",
        content: `We may collect personal information such as your name, email address, and project details when you contact us or use our services. This information is collected solely to provide our services and communicate effectively.`,
    },
    {
        id: "2",
        title: "Use of Information",
        content: `The information we collect is used to:
- Deliver our website services
- Respond to inquiries and support requests
- Send updates or announcements
- Improve our offerings

We never sell or rent your personal information to third parties.`,
    },
    {
        id: "3",
        title: "Cookies & Tracking",
        content: `We may use cookies or similar technologies for:
- Website performance
- Analytics purposes
- Enhancing user experience

These cookies are non-invasive and only for internal use.`,
    },
    {
        id: "4",
        title: "Data Retention",
        content: `Your personal information is retained only as long as necessary:
- To provide services
- To comply with legal obligations

Data no longer required is securely deleted or anonymized.`,
    },
    {
        id: "5",
        title: "Third-Party Services",
        content: `We may share data with trusted third-party services, such as:
- Hosting providers
- Analytics tools

These providers are contractually obligated to maintain confidentiality and use data only for the intended purpose.`,
    },
    {
        id: "6",
        title: "Contact",
        content: `For any questions regarding this Privacy Policy or your data, please contact us at contact@nexxupp.com.`,
    },
];

export default function PrivacyPolicyPage() {
    const [activeItem, setActiveItem] = useState("item-1");
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const today = new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        setLastUpdated(today);
    }, []);

    return (
        <section className="w-full bg-[#f9f9f9] min-h-screen py-12 md:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-block p-4 bg-white rounded-2xl mb-6 shadow-sm">
                        <Shield className="w-12 h-12 text-gray-800" aria-hidden="true" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. Please read how we handle your information.
                    </p>
                    {lastUpdated && (
                        <div className="mt-2 text-sm text-gray-400">
                            Last updated: {lastUpdated}
                        </div>
                    )}
                </motion.div>

                {/* Accordion Section */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Accordion
                        type="single"
                        className="w-full space-y-3"
                        defaultValue="item-1"
                        onValueChange={setActiveItem}
                        collapsible
                    >
                        {sections.map((section) => (
                            <AccordionItem
                                key={section.id}
                                value={`item-${section.id}`}
                                className="border border-gray-200 rounded-2xl px-6 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all duration-500 ease-out"
                            >
                                <AccordionTrigger className="py-5 hover:no-underline text-left group">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 group-data-[state=open]:text-blue-400 transition-all duration-500">
                                        {section.title}
                                    </h3>
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 pt-1">
                                    <motion.p
                                        className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-wrap"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        {section.content}
                                    </motion.p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="mt-16 text-center text-gray-700 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    By using our services, you acknowledge that you have read and understood this Privacy Policy.
                </motion.div>
            </div>
        </section>
    );
}