


import React from 'react'
import {trirong} from '@/fonts/fonts'
import { oranienbaum } from '@/fonts/fonts';

const Header2 = ({ text1, text2 }) => {
    return (
        <div className="w-full py-8 px-4 flex justify-center mt-10">
            <div className="max-w-4xl text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="relative w-2 h-2">
                        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-60 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-40 animate-pulse"></div>
                        <div className="relative w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></div>
                    </div>

                    <h2 className={`${trirong.className} text-[12px]  text-gray-600 uppercase tracking-wider`}>{text1}</h2>
                </div>
                <div>
                    <h1 className={`${oranienbaum.className} text-5xl font-bold text-gray-900 leading-tight`}>{text2}</h1>
                </div>
            </div>
        </div>
    )
}

export default Header2
