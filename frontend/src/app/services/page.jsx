"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Palette, MessageSquare } from "lucide-react";

const services = [
    {
        id: 1,
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies for exceptional performance.",
        icon: Code,
        href: "/services/web",
        features: ["Responsive Design", "Fast Performance", "SEO Optimized", "Scalable"],
    },
    {
        id: 2,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android that users love.",
        icon: Smartphone,
        href: "/services/mobile",
        features: ["iOS & Android", "Cross-Platform", "Native Performance", "App Store Ready"],
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Beautiful, intuitive designs that users love and businesses need to succeed.",
        icon: Palette,
        href: "/services/design",
        features: ["User Research", "Prototyping", "Visual Design", "Design Systems"],
    },
    {
        id: 4,
        title: "Consulting",
        description: "Strategic guidance to help your business thrive in the digital world.",
        icon: MessageSquare,
        href: "/services/consulting",
        features: ["Strategy", "Technical Audit", "Best Practices", "Growth Planning"],
    },
];

function ServicesPage() {
    const router = useRouter();

    const handleNavigate = (href) => {
        router.push(href);
    };

    const handleCTA = () => {
        router.push("/pricing");
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
                        {/* Label */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
                            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-500">
                                Our Services
                            </span>
                            <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-serif text-gray-900 mt-4"
                            variants={itemVariants}
                        >
                            What We{" "}
                            <br className="hidden sm:block" />
                            <span className="italic">Offer</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-sm sm:text-base mt-5 sm:mt-6 max-w-2xl mx-auto text-gray-600 leading-relaxed"
                            variants={itemVariants}
                        >
                            Comprehensive digital solutions tailored to your business needs. From concept to launch, we've got you covered.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-12 max-w-3xl mx-auto"
                        >
                            {[
                                { label: "Services", value: "4+" },
                                { label: "Projects", value: "150+" },
                                { label: "Clients", value: "80+" },
                                { label: "Success", value: "98%" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.id}
                                    onClick={() => handleNavigate(service.href)}
                                    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                                >
                                    {/* Card Content */}
                                    <div className="p-8 sm:p-10">
                                        {/* Icon */}
                                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300">
                                            <Icon className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 group-hover:text-black transition-colors">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm sm:text-base text-gray-600 font-light mb-6 leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {service.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-3 py-1 bg-gray-50 text-gray-600 rounded-full border border-gray-200"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Link */}
                                        <div className="flex items-center gap-2 text-black font-medium text-sm group-hover:gap-3 transition-all duration-300">
                                            <span>Learn More</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Number Badge */}
                                    <div className="absolute top-6 right-6 text-6xl sm:text-7xl font-light text-gray-50 leading-none select-none">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="w-full py-12 sm:py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            Why Choose{" "}
                            <span className="italic">NexxUpp</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            We combine expertise, innovation, and dedication to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                title: "Expert Team",
                                description: "Skilled professionals with years of industry experience",
                            },
                            {
                                title: "Quality Focused",
                                description: "Rigorous testing and quality assurance processes",
                            },
                            {
                                title: "On-Time Delivery",
                                description: "Meeting deadlines without compromising quality",
                            },
                            {
                                title: "Ongoing Support",
                                description: "Continuous support and maintenance post-launch",
                            },
                            {
                                title: "Scalable Solutions",
                                description: "Built to grow with your business needs",
                            },
                            {
                                title: "Transparent Process",
                                description: "Clear communication and project visibility",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-white text-sm font-medium">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <h3 className="text-lg font-medium mb-2 text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                            How We{" "}
                            <span className="italic">Work</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            A proven process that ensures success from start to finish
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { step: "01", title: "Discovery", description: "Understanding your goals and requirements" },
                            { step: "02", title: "Planning", description: "Creating roadmap and timeline" },
                            { step: "03", title: "Development", description: "Building your solution" },
                            { step: "04", title: "Launch", description: "Testing and deployment" },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl sm:text-6xl font-light text-gray-200 mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg sm:text-xl font-medium mb-2 text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
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
                            Ready to Get{" "}
                            <span className="italic">Started?</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Let's discuss your project and find the perfect solution for your needs.
                        </p>
                        <Button
                            className="bg-white text-black px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                            onClick={handleCTA}
                        >
                            View Pricing
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ServicesPage;