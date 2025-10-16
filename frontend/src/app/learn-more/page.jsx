"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PopupV1 from "@/components/PopupV1"; // imported PopupV1

const LearnMorePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleContinue = () => {
        setIsOpen(false);
        router.push("/pricing"); // redirect on Continue
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1400px] mx-auto py-12 sm:py-20 px-4 sm:px-8 space-y-20 sm:space-y-28 lg:space-y-32">
                {/* Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
                    <div className="space-y-4 sm:space-y-6">
                        <div className="inline-flex items-center gap-2 sm:gap-4 mb-3">
                            <div className="w-8 sm:w-14 h-[1px] bg-gray-300"></div>
                            <span className="text-[9px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
                                Learn More
                            </span>
                        </div>
                        <h1 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3.5rem] font-extralight tracking-[-0.02em] text-gray-900 leading-[1.1] sm:leading-[1.2]">
                            About NexxUpp
                            <br />
                            <span className="italic font-light">Our Journey</span>
                        </h1>
                        <p className="text-[13px] sm:text-[16px] leading-[1.6] sm:leading-[1.8] text-gray-500 font-light max-w-full sm:max-w-xl">
                            NexxUpp was founded by Samujal Phukan with a mission to deliver
                            modern, efficient, and user-friendly web solutions. We combine
                            creativity, technology, and strategy to help businesses grow
                            online.
                        </p>
                    </div>
                    <div className="relative h-[220px] sm:h-[350px] lg:h-[500px] w-full overflow-hidden bg-gray-50 rounded-sm">
                        <Image
                            src="/learn-hero.png"
                            alt="About NexxUpp"
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-[1000ms] ease-out hover:scale-[1.02]"
                        />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="pt-8 sm:pt-12 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                        <div className="space-y-1 sm:space-y-2">
                            <h3 className="text-[1.25rem] sm:text-[2rem] font-light tracking-tight text-gray-900 leading-[1.2]">
                                Ready to build something great?
                            </h3>
                            <p className="text-[12px] sm:text-[14px] text-gray-500 font-light">
                                Let's discuss how NexxUpp can bring your vision to life.
                            </p>
                        </div>

                        <Button
                            onClick={() => setIsOpen(true)} // open popup
                            className="group bg-black text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-6 sm:px-12 py-5 sm:py-7 rounded-full mt-4 sm:mt-0 flex items-center gap-3 sm:gap-4"
                        >
                            Talk to us
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </div>
                        </Button>
                    </div>
                </section>
            </div>

            {/* PopupV1 Component */}
            <PopupV1
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                onContinue={handleContinue}
                title="You have to select a plan first"
                description="Before you contact us, please choose the plan that best fits your needs."
                cancelLabel="Cancel"
                continueLabel="Continue"
            />
        </div>
    );
};

export default LearnMorePage;
