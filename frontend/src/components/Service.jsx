"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { servicesData } from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const Service = () => {
  const headerRef = useRef(null);
  const linesRef = useRef([]);
  const titleRef = useRef(null);

  const pinWrapRef = useRef(null); // pinned area (full-height, centered)
  const trackRef = useRef(null);   // horizontal track

  useGSAP(() => {
    // Header entrance
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    headerTl.fromTo(
      linesRef.current,
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );
    headerTl.fromTo(
      headerRef.current.querySelector(".service-label"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
    headerTl.fromTo(
      titleRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    );

    // Horizontal scroll driven by vertical scroll, pinned in the middle
    const getDistance = () =>
      trackRef.current.scrollWidth - pinWrapRef.current.clientWidth;

    const tween = gsap.to(trackRef.current, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: pinWrapRef.current,
        start: "center center", // start when the section center hits viewport center
        end: () => "+=" + getDistance(),
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // optional snap for a nicer feel
        snap:
          servicesData.length > 1
            ? {
                snapTo: (value) => {
                  const steps = servicesData.length - 1;
                  return Math.round(value * steps) / steps;
                },
                duration: { min: 0.15, max: 0.35 },
                ease: "power1.out",
              }
            : false,
      },
    });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <section className="py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{ perspective: "1000px" }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div
              ref={(el) => (linesRef.current[0] = el)}
              className="w-16 h-[1px] bg-black"
            />
            <span className="service-label text-[11px] font-semibold tracking-widest uppercase text-gray-500">
              Services
            </span>
            <div
              ref={(el) => (linesRef.current[1] = el)}
              className="w-16 h-[1px] bg-black"
            />
          </div>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-extralight tracking-tight text-black"
          >
            Our <span className="italic font-light">Services</span>
          </h2>
        </div>

        {/* Pinned horizontal scroller (centered vertically) */}
        <div
          ref={pinWrapRef}
          className="relative h-[80vh] md:h-[85vh] flex items-center overflow-hidden select-none"
          style={{ touchAction: "pan-y" }} // preserves vertical scroll on touch
        >
          {/* Gradient edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 " />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 " />

          {/* Horizontal track */}
          <div
            ref={trackRef}
            className="flex gap-10 md:gap-12 py-4 will-change-transform"
            style={{ transform: "translateZ(0)" }}
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="flex-shrink-0 w-80 md:w-96 p-10 rounded-3xl border border-gray-200 text-center  transform-gpu"
              >
                <div className="text-black mb-6 flex justify-center text-6xl md:text-7xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-bounce-subtle"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;