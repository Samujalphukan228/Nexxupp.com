"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function PricingCards() {
  const { price, fetchPrices } = useContext(AppContext);
  const router = useRouter();

  // Refs for animations
  const headerRef = useRef(null);
  const headerLineLeftRef = useRef(null);
  const headerLineRightRef = useRef(null);
  const headerLabelRef = useRef(null);
  const headerTitleRef = useRef(null);
  const headerDescRef = useRef(null);

  const cardRefs = useRef([]); // each pricing card
  const bottomInfoRef = useRef(null);

  useEffect(() => {
    if (!price.length) {
      fetchPrices();
    }
  }, []);

  const handleChoosePlan = (planId) => {
    router.push(`/contact?priceCardId=${planId}`);
  };

  useGSAP(
    () => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce || !price || price.length === 0) return;

      // Header entrance timeline
      const tlHeader = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headerLineLeftRef.current && headerLineRightRef.current) {
        tlHeader
          .fromTo(
            [headerLineLeftRef.current, headerLineRightRef.current],
            { scaleX: 0, transformOrigin: "center" },
            { scaleX: 1, duration: 0.6, stagger: 0.05 }
          )
          .fromTo(
            headerLabelRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.35"
          )
          .fromTo(
            headerTitleRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.2"
          )
          .fromTo(
            headerDescRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          );
      }

      // Cards reveal on scroll
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const badge = card.querySelector('[data-badge="popular"]');
        const features = card.querySelectorAll("ul li");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.from(card, { opacity: 0, y: 28, scale: 0.98, duration: 0.6 });

        if (badge) {
          tl.fromTo(
            badge,
            { y: -8, opacity: 0, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
            "-=0.2"
          );
        }

        if (features.length) {
          tl.from(
            features,
            { opacity: 0, y: 10, duration: 0.4, stagger: 0.05, ease: "power2.out" },
            "-=0.1"
          );
        }
      });

      // Bottom info reveal
      if (bottomInfoRef.current) {
        gsap.from(bottomInfoRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomInfoRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    [price]
  );

  if (!price.length) return null; // Show global loader

  return (
    <div className="py-20 sm:py-32 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20 sm:mb-28 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div ref={headerLineLeftRef} className="w-8 sm:w-16 h-[1px] bg-gray-300"></div>
            <span
              ref={headerLabelRef}
              className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400"
            >
              Pricing
            </span>
            <div ref={headerLineRightRef} className="w-8 sm:w-16 h-[1px] bg-gray-300"></div>
          </div>
          <h2
            ref={headerTitleRef}
            className="text-[2.5rem] sm:text-[4rem] lg:text-[4.5rem] font-extralight tracking-[-0.02em] text-gray-900 leading-[1.05] mb-6"
          >
            Simple,
            <br />
            <span className="italic font-light">Transparent Pricing</span>
          </h2>
          <p
            ref={headerDescRef}
            className="text-[15px] sm:text-[17px] leading-[1.8] text-gray-500 font-light"
          >
            Choose the plan that fits your needs. All plans include our essential features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {price.map((plan, idx) => (
            <div
              key={plan._id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`group relative border rounded-lg p-8 sm:p-10 transition-all duration-700 ease-out flex flex-col h-full ${
                plan.popular ? "border-gray-800 shadow-sm scale-[1.02]" : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  data-badge="popular"
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] font-medium tracking-[0.2em] uppercase px-4 py-1.5 rounded-sm"
                >
                  Most Popular
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="space-y-4 pb-6 border-b border-gray-100">
                  <h3 className="text-[1.25rem] sm:text-[1.5rem] font-light tracking-tight text-gray-900 group-hover:text-gray-800 transition-colors duration-500">
                    {plan.category}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-[2.5rem] sm:text-[3rem] font-extralight tracking-tight text-gray-900">
                      ₹{plan.price}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 py-6 flex-grow">
                  {(plan.features || []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-600 group-hover:text-gray-700 transition-colors duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[13px] sm:text-[14px] leading-[1.6] font-light text-gray-500">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-6 mt-auto">
                  <button
                    onClick={() => handleChoosePlan(plan._id)}
                    className="group bg-black text-white text-[12px] sm:text-[13px] tracking-[0.25em] uppercase font-semibold px-8 sm:px-10 py-5 sm:py-6 rounded-xl hover:bg-gray-800 transition-all duration-500 ease-out flex items-center justify-center gap-4 w-full sm:w-auto sm:flex-shrink-0 cursor-pointer"
                  >
                    Talk to us
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div ref={bottomInfoRef} className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-gray-100 text-center">
          <p className="text-[14px] sm:text-[15px] text-gray-500 font-light mb-6">
            All plans include 30-day money-back guarantee • Premium support • No hidden fees
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="inline-flex items-center gap-3 text-gray-700 text-[13px] font-medium group cursor-pointer hover:gap-4 transition-all duration-500 ease-out"
          >
            <span className="tracking-wider">Need a custom solution?</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}