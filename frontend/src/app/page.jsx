"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import { Feature197 } from "@/components/accordion1";
import { myFeatures, myFeatures2 } from "@/assets/assets";
import { Feature199 } from "@/components/according2";
import Header1 from "@/components/Header1";
import Header2 from "@/components/Header2";
import Service from "@/components/Service";
import { oranienbaum } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PopupV1 from "@/components/PopupV1"; // <-- imported PopupV1

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleTalkClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    router.push("/pricing");
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-12 sm:gap-16 lg:gap-20">


      {/* Hero Section */}
      <Hero />


      {/* First Feature Section */}
      <div className="w-full">
        <Header1 text1="The enterprise way" text2="Build for your Enterprise" />
        <Feature197 features={myFeatures} image="/nex-2img.avif" />
      </div>

      {/* Second Feature Section */}
      <div className="w-full">
        <Header2 text1="For Business" text2="Build for all business" />
        <Feature199 features={myFeatures2} image="/nex-3img.avif" />
      </div>

      {/* Services Section */}
      <div className="w-full">
        <Service />
      </div>

      {/* Call to Action */}
      <div className="flex flex-col items-center text-center gap-8 py-16 sm:py-20 max-w-4xl px-4">
        <div className="inline-flex items-center gap-3 sm:gap-4 mb-2">
          <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-600">
            Get Started
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
        </div>

        <h1
          className={`${oranienbaum.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-black`}
        >
          Let's Build Your
          <br />
          <span className="italic">Next Business</span>
        </h1>

        <p className="text-[15px] sm:text-[17px] text-gray-700 font-normal max-w-2xl leading-relaxed">
          Ready to transform your vision into reality? Let's create something
          exceptional together.
        </p>

        <Button
          onClick={handleTalkClick}
          className="group bg-black text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 sm:px-12 py-6 sm:py-7 rounded-full mt-4 mb-12 sm:mb-20 hover:bg-gray-800 transition-all duration-500 ease-out flex items-center gap-4"
        >
          Talk to us
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
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

      {/* Popup Modal */}
      <PopupV1
        open={showPopup}
        onCancel={() => setShowPopup(false)}
        onContinue={handleContinue}
        title="You have to select a plan first"
        description="Before you contact us, please choose the plan that best fits your needs."
        cancelLabel="Cancel"
        continueLabel="Continue"
      />
    </div>
  );
};

export default Page;
