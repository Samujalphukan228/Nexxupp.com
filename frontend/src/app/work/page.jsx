"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PopupV1 from "@/components/PopupV1";
import { AppContext } from "@/context/Context";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const { projects, fetchProjects } = useContext(AppContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Header refs
  const headerRef = useRef(null);
  const headerLineRef = useRef(null);
  const headerLabelRef = useRef(null);
  const headerTitleRef = useRef(null);
  const headerDescRef = useRef(null);
  const headerAvailRef = useRef(null);

  // Project refs
  const projectRefs = useRef([]);
  const imageWrapRefs = useRef([]);
  const contentRefs = useRef([]);
  const indexDesktopRefs = useRef([]);
  const indexMobileRefs = useRef([]);
  const footerCTARef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleContinue = () => {
    setIsPopupOpen(false);
    window.location.href = "/pricing";
  };

  useGSAP(
    () => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Don’t run animations until projects are loaded or if user prefers reduced motion
      if (reduce || !projects || projects.length === 0) return;

      // Header entrance
      const tlHeader = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headerLineRef.current) {
        tlHeader.fromTo(
          headerLineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.6 }
        );
      }

      if (headerLabelRef.current) {
        tlHeader.fromTo(
          headerLabelRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
      }

      if (headerTitleRef.current) {
        tlHeader.fromTo(
          headerTitleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2"
        );
      }

      const headerTextEls = [headerDescRef.current, headerAvailRef.current].filter(Boolean);
      if (headerTextEls.length) {
        tlHeader.from(
          headerTextEls,
          { opacity: 0, y: 18, duration: 0.6, stagger: 0.12 },
          "-=0.4"
        );
      }

      // Per-project animations
      projects.forEach((_, i) => {
        const projectEl = projectRefs.current[i];
        const imageBox = imageWrapRefs.current[i];
        const contentBox = contentRefs.current[i];
        const indexDK = indexDesktopRefs.current[i];
        const indexMB = indexMobileRefs.current[i];

        if (!projectEl) return;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: projectEl,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        if (imageBox) {
          tl.from(imageBox, { opacity: 0, y: 24, scale: 0.98, duration: 0.7 });
        }
        if (contentBox) {
          tl.from(
            contentBox,
            { opacity: 0, y: 28, duration: 0.6 },
            imageBox ? "-=0.35" : 0
          );
        }
        if (indexDK) tl.from(indexDK, { opacity: 0, y: 12, duration: 0.5 }, 0);
        if (indexMB) tl.from(indexMB, { opacity: 0, y: 12, duration: 0.5 }, 0);

        // Tags reveal
        if (contentBox) {
          const tags = contentBox.querySelectorAll(".tag-chip");
          if (tags.length) {
            gsap.from(tags, {
              opacity: 0,
              y: 10,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentBox,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }

          // "View Project" cue
          const cue = contentBox.querySelector('[data-cue="view-project"]');
          if (cue) {
            gsap.from(cue, {
              opacity: 0,
              y: 10,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentBox,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            });
          }
        }

        // Parallax on image
        if (imageBox) {
          gsap.to(imageBox, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: projectEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      });

      // Footer CTA
      if (footerCTARef.current) {
        gsap.from(footerCTARef.current, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerCTARef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    // re-run animations only when projects change
    [projects]
  );

  if (!projects || projects.length === 0) {
    return <p className="text-center py-12 text-gray-500">No projects to display.</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-24">
        {/* Header Section */}
        <div ref={headerRef} className="mb-16 sm:mb-24 max-w-4xl">
          <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div ref={headerLineRef} className="w-8 sm:w-14 h-[1px] bg-gray-300" />
            <span
              ref={headerLabelRef}
              className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400"
            >
              Portfolio 2024
            </span>
          </div>

          <h1
            ref={headerTitleRef}
            className="text-[2.5rem] sm:text-[4rem] leading-[0.95] font-extralight tracking-[-0.02em] text-gray-900 mb-5 sm:mb-6 max-w-3xl"
          >
            Selected
            <br />
            <span className="italic font-light">Works</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 mt-6 sm:mt-8">
            <p
              ref={headerDescRef}
              className="text-[13px] sm:text-[14px] leading-[1.8] text-gray-500 max-w-md font-light"
            >
              An exploration of digital experiences through thoughtful design and
              development. Each project represents a unique challenge and creative solution.
            </p>
            <div ref={headerAvailRef} className="flex flex-col gap-2 pt-1">
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gray-400">
                Available for work
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#11ff09] animate-pulse"></div>
                <span className="text-xs text-gray-600 font-medium">
                  Currently accepting projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-12 sm:space-y-24">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              ref={(el) => (projectRefs.current[index] = el)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Mobile: Index at top */}
                <div
                  ref={(el) => (indexMobileRefs.current[index] = el)}
                  className="flex items-center gap-4 lg:hidden"
                >
                  <div className="text-[12px] font-light text-gray-400 tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="h-px flex-1 bg-gray-100"></div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
                    {project.year}
                  </div>
                </div>

                {/* Desktop: Left - Index and Year */}
                <div className="hidden lg:block lg:col-span-2 pt-2">
                  <div
                    ref={(el) => (indexDesktopRefs.current[index] = el)}
                    className="space-y-5 sticky top-32"
                  >
                    <div className="text-[12px] font-light text-gray-400 tracking-wider">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="h-px w-7 bg-gray-200"></div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
                      {project.year}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="col-span-1 lg:col-span-6">
                  <div className="relative overflow-hidden bg-gray-50 rounded-sm">
                    <div
                      className="aspect-[16/11] relative will-change-transform"
                      ref={(el) => (imageWrapRefs.current[index] = el)}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="object-cover transition-all duration-[1000ms] ease-out group-hover:scale-[1.02]"
                        priority={index < 2}
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/3 transition-all duration-700"></div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/60 backdrop-blur-sm bg-white/10 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-700">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="col-span-1 lg:col-span-4 pt-2 space-y-5 sm:space-y-6 will-change-transform"
                  ref={(el) => (contentRefs.current[index] = el)}
                >
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-[1.5rem] sm:text-[2rem] leading-[1.1] font-light tracking-[-0.01em] text-gray-900 group-hover:translate-x-1 transition-transform duration-700 ease-out">
                      {project.title}
                    </h3>

                    <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-500 font-light sm:pr-8">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="tag-chip text-[9px] tracking-[0.15em] uppercase text-gray-500 font-medium px-2.5 py-1.5 border border-gray-200 rounded-sm hover:border-gray-400 hover:text-gray-700 transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    data-cue="view-project"
                    className="flex items-center gap-2.5 text-[11px] sm:text-[12px] text-gray-700 font-medium pt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700 ease-out"
                  >
                    <span className="tracking-wider">View Project</span>
                    <svg
                      className="w-3.5 h-3.5"
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
                </div>
              </div>

              {/* Divider Line */}
              {index < projects.length - 1 && (
                <div className="mt-12 sm:mt-24 h-px w-full bg-gray-100"></div>
              )}
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <section ref={footerCTARef} className="pt-10 sm:pt-16 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[1.5rem] sm:text-[2rem] font-light tracking-tight text-gray-900">
                Ready to start your project?
              </h3>
              <p className="text-[13px] sm:text-[14px] text-gray-500 font-light">
                Let's discuss how we can help bring your vision to life.
              </p>
            </div>

            <Button
              onClick={() => setIsPopupOpen(true)}
              className="group bg-black text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 sm:px-12 py-6 sm:py-7 rounded-full mt-4 mb-12 sm:mb-20 hover:bg-gray-800 transition-all duration-500 ease-out flex items-center gap-4"
            >
              Talk to us
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Button>
          </div>
        </section>
      </div>

      {/* PopupV1 Component */}
      <PopupV1
        open={isPopupOpen}
        onCancel={() => setIsPopupOpen(false)}
        onContinue={handleContinue}
        title="You have to select a plan first"
        description="Before you contact us, please choose the plan that best fits your needs."
        cancelLabel="Cancel"
        continueLabel="Continue"
      />
    </div>
  );
}