"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PopupV1 from "@/components/PopupV1";
import { motion } from "framer-motion";

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
        <motion.div
            className="text-center px-4 sm:px-6 md:px-8 py-2 sm:py-1 md:py-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Heading */}
            <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl leading-tight font-serif"
                variants={itemVariants}
            >
                Build your dream site with <br className="hidden md:block" />
                Nexxupp.com
            </motion.h1>

            {/* Paragraph */}
            <motion.p
                className="text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto text-gray-500 leading-relaxed"
                variants={itemVariants}
            >
                Nexxupp delivers professional, high-quality websites designed for businesses and teams aiming to make a lasting impact online.
            </motion.p>

            {/* Button */}
            <motion.div variants={itemVariants}>
                <Button
                    className="bg-black text-white px-6 sm:px-8 py-3 rounded-full mt-4 sm:mt-6 hover:bg-gray-900 transition-colors"
                    onClick={handleNavigate}
                >
                    Talk to us
                </Button>
            </motion.div>

            <PopupV1
                open={open}
                onCancel={handleCancel}
                onContinue={handleContinue}
            />
        </motion.div>
    );
}

export default Hero;
