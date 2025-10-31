"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Eye, Layers, Sparkles } from "lucide-react";
import { AppContext } from "@/context/Context";

const features = [
    {
        icon: Eye,
        title: "User Research",
        description: "Deep dive into user behavior, needs, and pain points to inform design decisions.",
    },
    {
        icon: Layers,
        title: "Prototyping",
        description: "Interactive prototypes that bring your ideas to life before development.",
    },
    {
        icon: Palette,
        title: "Visual Design",
        description: "Beautiful interfaces that align with your brand and delight users.",
    },
    {
        icon: Sparkles,
        title: "Design Systems",
        description: "Scalable component libraries that ensure consistency across products.",
    },
];

const process = [
    { step: "01", title: "Research & Discovery", description: "Understanding users and business goals" },
    { step: "02", title: "Ideation & Wireframing", description: "Sketching and structuring solutions" },
    { step: "03", title: "Visual Design", description: "Creating pixel-perfect interfaces" },
    { step: "04", title: "Prototyping & Testing", description: "Validating designs with real users" },
];

const tools = ["Figma", "Adobe XD", "Sketch", "InVision", "Miro", "Principle"];

function DesignPage() {
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
                                <Palette className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-500">
                                UI/UX Design
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-serif text-gray-900 mt-4"
                            variants={itemVariants}
                        >
                            Design That{" "}
                            <br className="hidden sm:block" />
                            <span className="italic">Converts</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-sm sm:text-base mt-5 sm:mt-6 max-w-2xl mx-auto text-gray-600 leading-relaxed"
                            variants={itemVariants}
                        >
                            We create intuitive, beautiful designs that not only look great but drive measurable business results through exceptional user experiences.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            Our Approach
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            User-centered design process that delivers results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-black transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-medium mb-3 text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="w-full py-12 sm:py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            Design Process
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            From concept to final product
                        </p>
                    </div>

                    <div className="space-y-6">
                        {process.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-6 p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="text-3xl sm:text-4xl font-light text-gray-200 flex-shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-medium mb-2 text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            Design Tools
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            Industry-leading design software
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {tools.map((tool) => (
                            <span
                                key={tool}
                                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white rounded-full text-sm sm:text-base text-gray-800 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300 border border-gray-200"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-16 sm:py-20 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center p-12 sm:p-16 bg-gradient-to-br from-gray-900 to-black rounded-3xl text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-5">
                            Let's Create{" "}
                            <span className="italic">Together</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Ready to elevate your product with exceptional design? Let's talk.
                        </p>
                        <Button
                            className="bg-white text-black px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                            onClick={handleNavigate}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DesignPage;