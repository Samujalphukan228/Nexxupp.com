


import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // ✅ Next.js optimized image component

export default function Work() {
    const projects = [
        {
            title: "Portfolio Website",
            description: "A personal portfolio built with Next.js and Tailwind CSS.",
            image: "https://picsum.photos/id/1015/800/600",
            link: "https://portfolite.framer.website/",
            tags: ["Next.js", "Tailwind CSS"],
            year: "2024",
        },
        {
            title: "E-commerce Store",
            description: "A modern e-commerce store using React and Stripe API.",
            image: "https://picsum.photos/id/1025/800/600",
            link: "https://forever-five-iota.vercel.app/",
            tags: ["React", "Stripe"],
            year: "2024",
        },
        {
            title: "Company site",
            description: "A headless CMS blog powered by Next.js and Sanity.io.",
            image: "https://picsum.photos/id/1040/800/600",
            link: "https://better-closet-732185.framer.app/",
            tags: ["Next.js", "Sanity.io"],
            year: "2023",
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-24">
                {/* Header Section */}
                <div className="mb-16 sm:mb-24 max-w-4xl">
                    <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 sm:w-14 h-[1px] bg-gray-300"></div>
                        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400">
                            Portfolio 2024
                        </span>
                    </div>

                    <h1 className="text-[2.5rem] sm:text-[4rem] leading-[0.95] font-extralight tracking-[-0.02em] text-gray-900 mb-5 sm:mb-6 max-w-3xl">
                        Selected
                        <br />
                        <span className="italic font-light">Works</span>
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 mt-6 sm:mt-8">
                        <p className="text-[13px] sm:text-[14px] leading-[1.8] text-gray-500 max-w-md font-light">
                            An exploration of digital experiences through thoughtful design
                            and development. Each project represents a unique challenge and
                            creative solution.
                        </p>
                        <div className="flex flex-col gap-2 pt-1">
                            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gray-400">
                                Available for work
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                                <span className="text-xs text-gray-600 font-medium">
                                    Currently accepting projects
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="space-y-12 sm:space-y-24">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                                {/* Mobile: Index at top */}
                                <div className="flex items-center gap-4 lg:hidden">
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
                                    <div className="space-y-5 sticky top-32">
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
                                        <div className="aspect-[16/11] relative">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                                                className="object-cover transition-all duration-[1000ms] ease-out group-hover:scale-[1.02]"
                                                priority={index < 2} // ✅ Prioritize first 2 images
                                                quality={90} // ✅ Better quality
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
                                <div className="col-span-1 lg:col-span-4 pt-2 space-y-5 sm:space-y-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="text-[1.5rem] sm:text-[2rem] leading-[1.1] font-light tracking-[-0.01em] text-gray-900 group-hover:translate-x-1 transition-transform duration-700 ease-out">
                                            {project.title}
                                        </h3>

                                        <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-500 font-light sm:pr-8">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="text-[9px] tracking-[0.15em] uppercase text-gray-500 font-medium px-2.5 py-1.5 border border-gray-200 rounded-sm hover:border-gray-400 hover:text-gray-700 transition-all duration-500"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2.5 text-[11px] sm:text-[12px] text-gray-700 font-medium pt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700 ease-out">
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
                <section className="pt-10 sm:pt-16 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
                        <div className="space-y-2 sm:space-y-3">
                            <h3 className="text-[1.5rem] sm:text-[2rem] font-light tracking-tight text-gray-900">
                                Ready to start your project?
                            </h3>
                            <p className="text-[13px] sm:text-[14px] text-gray-500 font-light">
                                Let's discuss how we can help bring your vision to life.
                            </p>
                        </div>

                        <Link href="/contact">
                            <Button className="group bg-black text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 sm:px-12 py-6 sm:py-7 rounded-full mt-4 mb-12 sm:mb-20 hover:bg-gray-800 transition-all duration-500 ease-out flex items-center gap-4">
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
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
