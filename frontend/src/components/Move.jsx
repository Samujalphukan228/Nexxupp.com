import React from 'react'
import { ArrowRight } from 'lucide-react'

const Move = () => {
    return (
        <a 
            href="https://medium.com/@contact_95805/nexxupp-com-modern-secure-websites-for-businesses-22deafad587a"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="inline-flex items-center bg-[#eaeaea] font-medium cursor-pointer px-4 py-2 rounded-full gap-2.5 group hover:bg-[#dedede] transition-colors">
                {/* Dot */}
                <div className="w-2 h-2 bg-black rounded-full"></div>

                {/* Text + Arrow */}
                <div className="flex items-center gap-1.5">
                    <span className="text-sm">Read Our Blogs</span>
                    <span className="flex items-center transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </a>
    )
}

export default Move