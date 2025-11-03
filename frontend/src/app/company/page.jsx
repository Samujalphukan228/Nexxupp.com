"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PopupV1 from "@/components/PopupV1";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const workSteps = [
  { title: "Consultation", desc: "We understand your business goals and project requirements.", number: "01" },
  { title: "Planning", desc: "We create a roadmap, defining milestones and timelines.", number: "02" },
  { title: "Design & Development", desc: "We craft visually appealing, responsive websites and apps.", number: "03" },
  { title: "Testing & Launch", desc: "We thoroughly test and deploy your solution with full support.", number: "04" },
];

const solutions = [
  { title: "Custom Websites", desc: "Beautiful, functional websites tailored to your business." },
  { title: "Web Applications", desc: "Powerful apps designed for your specific workflows." },
  { title: "E-commerce Solutions", desc: "Scalable and user-friendly online stores." },
  { title: "Maintenance & Support", desc: "Ongoing updates and technical support for peace of mind." },
];

const AboutPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTalkClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    window.location.href = "/pricing";
  };

  // Refs for animations
  const heroRef = useRef(null);
  const heroLineRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroImgRef = useRef(null);

  const aboutRef = useRef(null);
  const aboutImgRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutDividerRef = useRef(null);
  const aboutDescRef = useRef(null);
  const aboutLinkRef = useRef(null);

  const stepsSectionRef = useRef(null);
  const stepItemRefs = useRef([]);

  const solutionsSectionRef = useRef(null);
  const solutionCardRefs = useRef([]);

  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaDescRef = useRef(null);
  const ctaBtnRef = useRef(null);

  useGSAP(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    // Hero entrance
    const tlHero = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlHero
      .fromTo(
        heroLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.6 }
      )
      .fromTo(
        heroLabelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.2"
      )
      .fromTo(
        heroDescRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        heroImgRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" },
        "-=0.5"
      );

    // About section
    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
      .fromTo(
        aboutImgRef.current,
        { opacity: 0, x: -30, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8 }
      )
      .from(
        [aboutTitleRef.current, aboutDividerRef.current, aboutDescRef.current, aboutLinkRef.current],
        { opacity: 0, y: 20, stagger: 0.12, duration: 0.6 },
        "-=0.4"
      );

    // Steps (How We Work)
    gsap.from(stepItemRefs.current, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: stepsSectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Solutions grid
    gsap.from(solutionCardRefs.current, {
      opacity: 0,
      y: 28,
      scale: 0.98,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: solutionsSectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // CTA
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .from([ctaTitleRef.current, ctaDescRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      })
      .from(
        ctaBtnRef.current,
        {
          opacity: 0,
          y: 16,
          scale: 0.96,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

    // Refresh after images load to ensure correct trigger positions
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto py-12 sm:py-20 px-4 sm:px-8 space-y-20 sm:space-y-28 lg:space-y-32">
        {/* Hero Section */}
        <section ref={heroRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 sm:gap-4 mb-3">
              <div ref={heroLineRef} className="w-8 sm:w-14 h-[1px] bg-gray-300" />
              <span ref={heroLabelRef} className="text-[9px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
                About Us
              </span>
            </div>
            <h1
              ref={heroTitleRef}
              className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3.5rem] font-extralight tracking-[-0.02em] text-gray-900 leading-[1.1] sm:leading-[1.2]"
            >
              Professional Web
              <br />
              <span className="italic font-light">Solutions</span>
            </h1>
            <p
              ref={heroDescRef}
              className="text-[13px] sm:text-[16px] leading-[1.6] sm:leading-[1.8] text-gray-500 font-light max-w-full sm:max-w-xl"
            >
              At NexxUpp, we craft modern websites and digital solutions that help businesses grow and engage customers efficiently.
            </p>
          </div>
          <div
            ref={heroImgRef}
            className="relative h-[220px] sm:h-[350px] lg:h-[500px] w-full overflow-hidden bg-gray-50 rounded-sm"
          >
            <Image
              src="/top.png"
              alt="About NexxUpp"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-[1000ms] ease-out hover:scale-[1.02]"
              priority
            />
          </div>
        </section>

        {/* About Company */}
        <section ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
          <div
            ref={aboutImgRef}
            className="relative h-[220px] sm:h-[300px] lg:h-[460px] w-full overflow-hidden bg-gray-50 rounded-sm order-2 lg:order-1"
          >
            <Image
              src="/mid.png"
              alt="Company"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-[1000ms] ease-out hover:scale-[1.02]"
            />
          </div>
          <div className="space-y-4 sm:space-y-5 order-1 lg:order-2">
            <div className="space-y-2">
              <h2 ref={aboutTitleRef} className="text-[1.5rem] sm:text-[2.5rem] font-light tracking-tight text-gray-900 leading-[1.1] sm:leading-[1.2]">
                About NexxUpp
              </h2>
              <div ref={aboutDividerRef} className="w-14 h-[1px] bg-gray-300"></div>
            </div>
            <p
              ref={aboutDescRef}
              className="text-[13px] sm:text-[16px] leading-[1.6] sm:leading-[1.8] text-gray-500 font-light"
            >
              NexxUpp is a full-service digital agency focused on creating modern web experiences. We combine design, development, and strategy to deliver products that are visually appealing, fast, and reliable.
            </p>
            <div ref={aboutLinkRef} className="pt-2 sm:pt-3">
              <div className="inline-flex items-center gap-2 text-gray-700 font-medium text-[11px] sm:text-[12px] group cursor-pointer">
                <Link href="/learn-more" className="tracking-wider">
                  Learn More
                </Link>
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform duration-500 ease-out"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section ref={stepsSectionRef}>
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-4 mb-4">
              <div className="w-8 sm:w-14 h-[1px] bg-gray-300"></div>
              <span className="text-[9px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">Process</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] font-light tracking-tight text-gray-900 leading-[1.2]">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {workSteps.map(({ title, desc, number }, i) => (
              <div
                key={title}
                ref={(el) => (stepItemRefs.current[i] = el)}
                className="space-y-3 pb-5 border-b border-gray-200"
              >
                <div className="text-[11px] sm:text-[12px] font-light text-gray-400 tracking-wider">{number}</div>
                <h3 className="text-[1.2rem] sm:text-[1.5rem] font-light text-gray-900 leading-[1.2]">{title}</h3>
                <p className="text-[12px] sm:text-[14px] leading-[1.6] text-gray-500 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Solutions */}
        <section ref={solutionsSectionRef}>
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-4 mb-4">
              <div className="w-8 sm:w-14 h-[1px] bg-gray-300"></div>
              <span className="text-[9px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">Services</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] font-light tracking-tight text-gray-900 leading-[1.2]">Our Solutions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {solutions.map(({ title, desc }, i) => (
              <div
                key={title}
                ref={(el) => (solutionCardRefs.current[i] = el)}
                className="relative p-5 sm:p-6 border border-gray-200 rounded-sm overflow-hidden bg-white"
              >
                <div className="absolute top-2 right-2 text-[4rem] sm:text-[5rem] font-extralight text-gray-50 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative z-10 space-y-2 sm:space-y-3">
                  <h3 className="text-[1.2rem] sm:text-[1.5rem] font-light text-gray-900 leading-[1.2]">{title}</h3>
                  <p className="text-[12px] sm:text-[14px] leading-[1.6] text-gray-500 font-light max-w-full sm:max-w-md">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="pt-8 sm:pt-12 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <h3
                ref={ctaTitleRef}
                className="text-[1.25rem] sm:text-[2rem] font-light tracking-tight text-gray-900 leading-[1.2]"
              >
                Ready to start your project?
              </h3>
              <p ref={ctaDescRef} className="text-[12px] sm:text-[14px] text-gray-500 font-light">
                Let's discuss how we can help bring your vision to life.
              </p>
            </div>

            <Button
              ref={ctaBtnRef}
              onClick={handleTalkClick}
              className="group bg-black text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-6 sm:px-12 py-5 sm:py-7 rounded-full mt-4 sm:mt-0 flex items-center gap-3 sm:gap-4"
            >
              Talk to us
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Button>
          </div>
        </section>
      </div>

      {/* PopupV1 */}
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

export default AboutPage;