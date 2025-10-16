"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PopupV1 from "@/components/PopupV1";

function Hero() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = () => setOpen(true);
    const handleContinue = () => {
        setOpen(false);
        router.push("/pricing");
    };
    const handleCancel = () => setOpen(false);

    return (
        <div className="text-center px-4 sm:px-6 md:px-8 py-2 sm:py-1 md:py-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-serif">
                Build your dream site with <br className="hidden md:block" />
                Nexxupp.com
            </h1>

            <p className="text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto text-gray-500 leading-relaxed">
                Nexxupp delivers professional, high-quality websites designed for businesses and teams aiming to make a lasting impact online.
            </p>

            <Button
                className="bg-black text-white px-6 sm:px-8 py-3 rounded-full mt-4 sm:mt-6 hover:bg-gray-900 transition-colors"
                onClick={handleNavigate}
            >
                Talk to us
            </Button>

            <PopupV1
                open={open}
                onCancel={handleCancel}
                onContinue={handleContinue}
            />
        </div>
    );
}

export default Hero;