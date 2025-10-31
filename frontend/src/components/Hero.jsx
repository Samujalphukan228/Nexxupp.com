"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PopupV1 from "@/components/PopupV1";
import { motion } from "framer-motion";
import Move from "@/components/Move";
import MainImage from "@/components/MainImage";

function Hero() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = () => setOpen(true);
    const handleContinue = () => {
        setOpen(false);
        router.push("/pricing");
    };
    const handleCancel = () => setOpen(false);

    // Framer Motion variants for staggered entrance
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <>
            {/* Hero Content Section */}
            <section className="w-full pt-8 sm:pt-12 md:pt-14 pb-6 sm:pb-8 md:pb-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    <motion.div
                        className="text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Move Component */}
                        <Move />

                        {/* Heading */}
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl leading-tight font-serif text-gray-900 mt-6 sm:mt-8"
                            variants={itemVariants}
                        >
                            Build your dream site with{" "}
                            <br className="hidden sm:block" />
                            Nexxupp.com
                        </motion.h1>

                        {/* Paragraph */}
                        <motion.p
                            className="text-sm sm:text-base mt-4 sm:mt-5 max-w-2xl mx-auto text-gray-600 leading-relaxed"
                            variants={itemVariants}
                        >
                            Nexxupp delivers professional, high-quality websites designed for businesses and teams aiming to make a lasting impact online.
                        </motion.p>

                        {/* Button */}
                        <motion.div variants={itemVariants} className="mt-6 sm:mt-7">
                            <Button
                                className="bg-black text-white px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base rounded-full hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                                onClick={handleNavigate}
                            >
                                Talk to us
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Image Section */}
            <section className="w-full">
                <MainImage />
            </section>

            <PopupV1
                open={open}
                onCancel={handleCancel}
                onContinue={handleContinue}
            />
        </>
    );
}


export default Hero;
