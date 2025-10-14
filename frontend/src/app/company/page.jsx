import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    return (
        <div className="min-h-screen">
            <div className="max-w-[1400px] mx-auto py-12 sm:py-20 px-4 sm:px-8 space-y-24 sm:space-y-32">

                {/* Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="space-y-5 sm:space-y-6">
                        <div className="inline-flex items-center gap-3 sm:gap-4">
                            <div className="w-8 sm:w-14 h-[1px] bg-gray-300"></div>
                            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400">
                                About Us
                            </span>
                        </div>
                        <h1 className="text-[2rem] sm:text-[3rem] lg:text-[3.5rem] font-extralight tracking-[-0.02em] text-gray-900 leading-[1.05]">
                            Professional Web
                            <br />
                            <span className="italic font-light">Solutions</span>
                        </h1>
                        <p className="text-[14px] sm:text-[16px] leading-[1.8] text-gray-500 font-light max-w-xl">
                            At NexxUpp, we craft modern websites and digital solutions that help businesses grow and engage customers efficiently.
                        </p>
                    </div>
                    <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden bg-gray-50 rounded-sm">
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
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="relative h-[300px] sm:h-[380px] lg:h-[460px] w-full overflow-hidden bg-gray-50 rounded-sm order-2 lg:order-1">
                        <Image
                            src="/mid.png"
                            alt="Company"
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-[1000ms] ease-out hover:scale-[1.02]"
                        />
                    </div>
                    <div className="space-y-5 order-1 lg:order-2">
                        <div className="space-y-3">
                            <h2 className="text-[1.75rem] sm:text-[2.5rem] font-light tracking-tight text-gray-900 leading-[1.1]">
                                About NexxUpp
                            </h2>
                            <div className="w-14 h-[1px] bg-gray-300"></div>
                        </div>
                        <p className="text-[14px] sm:text-[16px] leading-[1.8] text-gray-500 font-light">
                            NexxUpp is a full-service digital agency focused on creating modern web experiences. We combine design, development, and strategy to deliver products that are visually appealing, fast, and reliable.
                        </p>
                        <div className="pt-3">
                            <div className="inline-flex items-center gap-2.5 text-gray-700 font-medium text-[12px] group cursor-pointer">
                                <span className="tracking-wider">Learn More</span>
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How We Work */}
                <section>
                    <div className="mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-3 sm:gap-4 mb-5">
                            <div className="w-8 sm:w-14 h-[1px] bg-gray-300"></div>
                            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400">
                                Process
                            </span>
                        </div>
                        <h2 className="text-[2rem] sm:text-[3rem] font-light tracking-tight text-gray-900">
                            How We Work
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
                        {workSteps.map(({ title, desc, number }) => (
                            <div
                                key={title}
                                className="group space-y-5 pb-6 border-b border-gray-200 hover:border-gray-400 transition-all duration-700 ease-out"
                            >
                                <div className="space-y-3">
                                    <div className="text-[12px] font-light text-gray-400 tracking-wider">
                                        {number}
                                    </div>
                                    <h3 className="text-[1.25rem] sm:text-[1.5rem] font-light text-gray-900 group-hover:translate-x-1 transition-transform duration-700 ease-out">
                                        {title}
                                    </h3>
                                </div>
                                <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-500 font-light">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Solutions */}
                <section>
                    <div className="mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-3 sm:gap-4 mb-5">
                            <div className="w-8 sm:w-14 h-[1px] bg-gray-300"></div>
                            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400">
                                Services
                            </span>
                        </div>
                        <h2 className="text-[2rem] sm:text-[3rem] font-light tracking-tight text-gray-900">
                            Our Solutions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {solutions.map(({ title, desc }, index) => (
                            <div
                                key={title}
                                className="group relative p-6 sm:p-8 border border-gray-200 rounded-sm hover:border-gray-400 hover:shadow-sm transition-all duration-700 ease-out overflow-hidden"
                            >
                                {/* Background number */}
                                <div className="absolute top-5 right-5 text-[5rem] sm:text-[6rem] font-extralight text-gray-50 leading-none select-none transition-all duration-700 ease-out group-hover:text-gray-100">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div className="relative z-10 space-y-3">
                                    <h3 className="text-[1.25rem] sm:text-[1.5rem] font-light text-gray-900 group-hover:translate-x-1 transition-transform duration-700 ease-out">
                                        {title}
                                    </h3>
                                    <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-500 font-light max-w-md">
                                        {desc}
                                    </p>
                                    <div className="pt-3 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                                        <div className="inline-flex items-center gap-2 text-gray-700 text-[11px] font-medium">
                                            <span className="tracking-wider">Explore</span>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover line effect */}
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gray-400 group-hover:w-full transition-all duration-[1000ms] ease-out"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
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
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;