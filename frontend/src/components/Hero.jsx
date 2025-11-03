"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PopupV1 from "@/components/PopupV1";
import Move from "@/components/Move";
import MainImage from "@/components/MainImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Refs for GSAP animations
    const containerRef = useRef(null);
    const moveRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);
    const imageRef = useRef(null);

    const handleNavigate = () => setOpen(true);
    const handleContinue = () => {
        setOpen(false);
        router.push("/pricing");
    };
    const handleCancel = () => setOpen(false);

    // GSAP entrance animations
    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // Staggered entrance animation
        tl.fromTo(
            moveRef.current,
            {
                opacity: 0,
                y: 30,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.4)"
            }
        )
        .fromTo(
            headingRef.current,
            {
                opacity: 0,
                y: 40,
                rotateX: -15
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1,
                ease: "power4.out"
            },
            "-=0.4"
        )
        .fromTo(
            paragraphRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            },
            "-=0.6"
        )
        .fromTo(
            buttonRef.current,
            {
                opacity: 0,
                y: 30,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            },
            "-=0.5"
        )
        .fromTo(
            imageRef.current,
            {
                opacity: 0,
                y: 60,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power4.out"
            },
            "-=0.6"
        );

        // Add subtle floating animation to button after entrance
        gsap.to(buttonRef.current, {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5
        });

    }, []);

    // Button hover animation
    const handleButtonMouseEnter = () => {
        gsap.to(buttonRef.current, {
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.3,
            ease: "back.out(2)"
        });
    };

    const handleButtonMouseLeave = () => {
        gsap.to(buttonRef.current, {
            scale: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleButtonMouseDown = () => {
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1
        });
    };

    const handleButtonMouseUp = () => {
        gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "back.out(3)"
        });
    };

    return (
        <>
            {/* Hero Content Section */}
            <section className="w-full pt-8 sm:pt-12 md:pt-14 pb-6 sm:pb-8 md:pb-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    <div ref={containerRef} className="text-center">
                        {/* Move Component */}
                        <div ref={moveRef}>
                            <Move />
                        </div>

                        {/* Heading */}
                        <h1
                            ref={headingRef}
                            className="text-3xl sm:text-4xl md:text-5xl leading-tight font-serif text-gray-900 mt-6 sm:mt-8"
                            style={{ perspective: "1000px" }}
                        >
                            Build your dream site with{" "}
                            <br className="hidden sm:block" />
                            <span 
                                className="inline-block"
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        color: "#000",
                                        textShadow: "0 0 20px rgba(0,0,0,0.2)",
                                        duration: 0.3,
                                        ease: "power2.out"
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        color: "#111827",
                                        textShadow: "0 0 0px rgba(0,0,0,0)",
                                        duration: 0.3,
                                        ease: "power2.out"
                                    });
                                }}
                            >
                                Nexxupp.com
                            </span>
                        </h1>

                        {/* Paragraph */}
                        <p
                            ref={paragraphRef}
                            className="text-sm sm:text-base mt-4 sm:mt-5 max-w-2xl mx-auto text-gray-600 leading-relaxed"
                        >
                            Nexxupp delivers professional, high-quality websites designed for businesses and teams aiming to make a lasting impact online.
                        </p>

                        {/* Button */}
                        <div className="mt-6 sm:mt-7">
                            <Button
                                ref={buttonRef}
                                className="bg-black text-white px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base rounded-full hover:bg-gray-900 transition-colors duration-300 shadow-lg font-medium"
                                onClick={handleNavigate}
                                onMouseEnter={handleButtonMouseEnter}
                                onMouseLeave={handleButtonMouseLeave}
                                onMouseDown={handleButtonMouseDown}
                                onMouseUp={handleButtonMouseUp}
                            >
                                Talk to us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Image Section */}
            <section ref={imageRef} className="w-full">
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
