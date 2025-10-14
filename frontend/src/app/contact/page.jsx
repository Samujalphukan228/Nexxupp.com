"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { AppContext } from "@/context/Context";


export default function ContactPage() {
    const searchParams = useSearchParams();
    const priceCardId = searchParams.get("priceCardId"); // Get plan ID from URL
    const { addQuery, loading } = useContext(AppContext);

    const [formData, setFormData] = useState({ email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!priceCardId) {
            alert("No plan selected.");
            return;
        }

        await addQuery({
            email: formData.email,
            priceCardId,
            message: formData.message,
        });

        setSubmitted(true);
        setFormData({ email: "", message: "" });
        
        
    };

    // Show global loader when submitting
    if (loading) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-32">

                {/* Header */}
                <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
                        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-600">
                            Get In Touch
                        </span>
                        <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
                    </div>
                    <h1 className="text-[3rem] sm:text-[4rem] lg:text-[5rem] font-extralight tracking-[-0.02em] text-black leading-[1.1] mb-6">
                        Let's
                        <br />
                        <span className="italic font-light">Connect</span>
                    </h1>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-gray-700 font-normal max-w-2xl mx-auto">
                        Ready to transform your vision into reality? Send us a message and we'll create something exceptional together.
                    </p>
                </div>

                {/* Form Container */}
                <div className="max-w-2xl mx-auto">
                    {submitted ? (
                        <div className="text-center py-16 sm:py-20 space-y-8 border border-gray-300 rounded-sm p-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black mb-4">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-[2rem] sm:text-[2.5rem] font-light text-black">
                                Thank you!
                            </h3>
                            <p className="text-[15px] sm:text-[17px] text-gray-700 font-normal max-w-md mx-auto leading-relaxed">
                                We've received your message and will get back to you shortly.
                            </p>
                            <div className="pt-8">
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="inline-flex items-center gap-3 text-black text-[13px] font-semibold group hover:gap-4 transition-all duration-500"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                    </svg>
                                    <span className="tracking-wider">Send another message</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="border border-gray-300 rounded-sm p-8 sm:p-12">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Email Field */}
                                <div className="space-y-3">
                                    <label className="block text-[13px] font-semibold text-black">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-sm px-4 py-4 text-[15px] font-normal text-black placeholder-gray-500 bg-white focus:outline-none focus:border-black transition-colors duration-500"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="space-y-3">
                                    <label className="block text-[13px] font-semibold text-black">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full border border-gray-300 rounded-sm px-4 py-4 text-[15px] font-normal text-black placeholder-gray-500 bg-white focus:outline-none focus:border-black transition-colors duration-500 resize-none"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button 
                                        type="submit"
                                        className="group bg-black text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 sm:px-12 py-6 sm:py-7 rounded-full mt-4 mb-12 sm:mb-20 hover:bg-gray-800 transition-all duration-500 ease-out flex items-center gap-4 w-full justify-center cursor-pointer"
                                    >
                                        Talk to us
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                            </form>

                            {/* Additional Info */}
                            <div className="pt-8 mt-8 border-t border-gray-200">
                                <p className="text-[13px] text-gray-600 font-normal text-center">
                                    We typically respond within 24 hours • Your information is kept confidential
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Section - Alternative Contact */}
                <div className="mt-20 sm:mt-24 pt-12 sm:pt-16 border-t border-gray-300">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 sm:gap-4 mb-6">
                                <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
                                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-600">
                                    Contact
                                </span>
                                <div className="w-12 sm:w-16 h-[1px] bg-gray-400"></div>
                            </div>
                            <h3 className="text-[1.75rem] sm:text-[2.5rem] font-light text-black mb-3 leading-[1.1]">
                                Other Ways to
                                <br />
                                <span className="italic">Reach Us</span>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {/* Email */}
                            <a 
                                href="mailto:hello@nexxupp.com"
                                className="text-center space-y-4 p-6 border border-gray-300 rounded-sm hover:border-black hover:shadow-sm transition-all duration-500 cursor-pointer"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11px] tracking-[0.2em] uppercase text-gray-600 font-semibold mb-2">Email</p>
                                    <p className="text-[14px] text-black font-medium">hello@nexxupp.com</p>
                                </div>
                            </a>

                            {/* Phone */}
                            <a 
                                href="tel:+15551234567"
                                className="text-center space-y-4 p-6 border border-gray-300 rounded-sm hover:border-black hover:shadow-sm transition-all duration-500 cursor-pointer"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11px] tracking-[0.2em] uppercase text-gray-600 font-semibold mb-2">Phone</p>
                                    <p className="text-[14px] text-black font-medium">+1 (555) 123-4567</p>
                                </div>
                            </a>

                            {/* Location */}
                            <div className="text-center space-y-4 p-6 border border-gray-300 rounded-sm hover:border-black hover:shadow-sm transition-all duration-500">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11px] tracking-[0.2em] uppercase text-gray-600 font-semibold mb-2">Office</p>
                                    <p className="text-[14px] text-black font-medium">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}