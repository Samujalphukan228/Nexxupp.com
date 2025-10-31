"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Zap, Users, Shield } from "lucide-react";
import { AppContext } from "@/context/Context";

const features = [
    {
        icon: Smartphone,
        title: "Cross-Platform",
        description: "Build once, deploy everywhere. iOS and Android from a single codebase.",
    },
    {
        icon: Zap,
        title: "Native Performance",
        description: "Smooth, fast, and responsive apps that feel truly native.",
    },
    {
        icon: Users,
        title: "User-Centric Design",
        description: "Intuitive interfaces designed for maximum user engagement.",
    },
    {
        icon: Shield,
        title: "Secure & Reliable",
        description: "Enterprise-grade security and reliability built-in from the start.",
    },
];

const platforms = ["iOS", "Android", "React Native", "Flutter", "Progressive Web Apps"];

function MobileAppsPage() {
    const router = useRouter();
    const { startLoading } = useContext(AppContext);

    const handleNavigate = () => {
        startLoading();
        setTimeout(() => router.push("/pricing"), 100);
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
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
                        <motion.div variants={itemVariants}>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 sm:mb-8 group transition-colors"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                Back to Services
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                <Smartphone className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-500">
                                Mobile Apps
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-serif text-gray-900 mt-4"
                            variants={itemVariants}
                        >
                            Mobile Apps That{" "}
                            <br className="hidden sm:block" />
                            <span className="italic">Users Love</span>
                        </motion.h1>

                        <motion.p
                            className="text-sm sm:text-base mt-5 sm:mt-6 max-w-2xl mx-auto text-gray-600 leading-relaxed"
                            variants={itemVariants}
                        >
                            We design and develop powerful mobile applications that deliver seamless experiences across all devices and platforms.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            Why Choose Us
                        </h2>
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

            {/* Platforms Section */}
            <section className="w-full py-12 sm:py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            Platforms We Support
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {platforms.map((platform) => (
                            <span
                                key={platform}
                                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-100 rounded-full text-sm sm:text-base text-gray-800 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
                            >
                                {platform}
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
                            Ready to Launch{" "}
                            <span className="italic">Your App?</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Let's discuss your mobile app idea and bring it to life.
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

export default MobileAppsPage;