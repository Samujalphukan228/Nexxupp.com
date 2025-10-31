"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Target, TrendingUp, Shield } from "lucide-react";
import { AppContext } from "@/context/Context";

const services = [
    {
        icon: Target,
        title: "Digital Strategy",
        description: "Comprehensive roadmaps to achieve your business goals through technology.",
    },
    {
        icon: Shield,
        title: "Technical Audit",
        description: "In-depth analysis of your current tech stack and infrastructure.",
    },
    {
        icon: TrendingUp,
        title: "Growth Planning",
        description: "Scalable strategies to grow your digital presence and revenue.",
    },
    {
        icon: MessageSquare,
        title: "Best Practices",
        description: "Industry-leading methodologies and standards implementation.",
    },
];

const areas = [
    "Technology Stack Selection",
    "Architecture Planning",
    "Performance Optimization",
    "Security Assessment",
    "Team Training",
    "Process Improvement",
];

function ConsultingPage() {
    const router = useRouter();
    const { startLoading } = useContext(AppContext);

    const handleNavigate = () => {
        startLoading();
        setTimeout(() => router.push("/pricing"), 100);
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="w-full pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16 md:pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    <motion.div
                        className="text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Back Link */}
                        <motion.div variants={itemVariants}>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 sm:mb-8 group transition-colors"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                Back to Services
                            </Link>
                        </motion.div>

                        {/* Icon Badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-500">
                                Consulting
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-serif text-gray-900 mt-4"
                            variants={itemVariants}
                        >
                            Expert Guidance{" "}
                            <br className="hidden sm:block" />
                            <span className="italic">For Growth</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-sm sm:text-base mt-5 sm:mt-6 max-w-2xl mx-auto text-gray-600 leading-relaxed"
                            variants={itemVariants}
                        >
                            Strategic technology consulting to help you make informed decisions, optimize operations, and accelerate your digital transformation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            What We Offer
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            Comprehensive consulting services for digital success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-black transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-medium mb-3 text-gray-900">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Consulting Areas Section */}
            <section className="w-full py-12 sm:py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            Consulting Areas
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            Specialized expertise across multiple domains
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {areas.map((area, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 text-center"
                            >
                                <p className="font-medium text-sm sm:text-base text-gray-800">{area}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-16 sm:py-20 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center p-12 sm:p-16 bg-gradient-to-br from-gray-900 to-black rounded-3xl text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-5">
                            Let's Discuss{" "}
                            <span className="italic">Your Goals</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Schedule a free consultation to explore how we can help accelerate your growth.
                        </p>
                        <Button
                            className="bg-white text-black px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                            onClick={handleNavigate}
                        >
                            Book Consultation
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ConsultingPage;