import React from 'react'
import { ArrowRight } from 'lucide-react'

const Move = () => {
    return (
        <a 
            href="https://medium.com/@contact_95805/nexxupp-com-modern-secure-websites-for-businesses-22deafad587a"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            aria-label="Read our blogs on Medium"
        >
            <div className="relative inline-flex items-center bg-[#eaeaea] font-medium cursor-pointer px-4 py-2.5 rounded-full gap-2.5 group hover:bg-[#dedede] transition-all duration-300 hover:shadow-md">
                {/* Animated Dot */}
                <div className="relative flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute w-2 h-2 bg-black rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Text + Arrow */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium tracking-wide">Read Our Blogs</span>
                    <span className="flex items-center overflow-hidden">
                        <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                    </span>
                </div>

                {/* Subtle shimmer effect on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 group-hover:animate-shimmer pointer-events-none"></div>
            </div>
        </a>
    )
}

export default Move