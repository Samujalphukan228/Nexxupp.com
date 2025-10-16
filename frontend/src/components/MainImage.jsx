"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const MainImage = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);

  const messages = [
    { id: 1, type: 'received', text: 'Do you create professional websites?', delay: 500 },
    { id: 2, type: 'sent', text: 'Yes! We design sites that grow your business', delay: 1800 },
    { id: 3, type: 'received', text: "That's exactly what I need!", delay: 3200 },
    { id: 4, type: 'sent', text: "Let's bring your vision to life! 🚀", delay: 4500 }
  ];

  useEffect(() => {
    let timeoutIds = [];

    messages.forEach((message, index) => {
      const id = setTimeout(() => {
        setShowTyping(true);

        const typingTimeout = setTimeout(() => {
          setShowTyping(false);
          setVisibleMessages(prev => [...prev, { ...message, uniqueKey: `${message.id}-${index}` }]);
        }, 800);

        timeoutIds.push(typingTimeout);
      }, message.delay);

      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">

        {/* Background Image */}
        <Image
          src="/image-nexx.avif"
          alt="Nexx Image"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/40" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Chat Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-3 sm:px-6">

          <div className="w-full max-w-[95%] sm:max-w-md bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl p-4 sm:p-5">

            {/* Chat Header */}
            <div className="flex items-center gap-2.5 sm:gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/10">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white/90"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm sm:text-base truncate">Contact@nexxUpp.com</h3>
                <p className="text-white/60 text-[11px] sm:text-xs truncate">Online</p>
              </div>
            </div>

            {/* Messages Container */}
            <div className="space-y-2.5 sm:space-y-3 min-h-[220px] sm:min-h-[240px] max-h-[280px] overflow-y-auto scrollbar-hide">
              {visibleMessages.map((message) => (
                <div
                  key={message.uniqueKey}
                  className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                >
                  {message.type === 'received' && (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-1.5 sm:mr-2 flex-shrink-0 mt-auto mb-0.5">
                      <span className="text-white text-[10px] sm:text-xs font-bold">N</span>
                    </div>
                  )}

                  <div className={`max-w-[80%] sm:max-w-[75%] ${message.type === 'sent' ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                        message.type === 'sent'
                          ? 'bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-xl sm:rounded-2xl rounded-tr-sm'
                          : 'bg-white/95 backdrop-blur-md text-gray-800 rounded-xl sm:rounded-2xl rounded-tl-sm'
                      }`}
                    >
                      <p className="text-[13px] sm:text-sm font-medium leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                    <p className={`text-[9px] sm:text-[10px] text-white/50 mt-0.5 px-1 ${message.type === 'sent' ? 'text-right' : 'text-left'}`}>
                      Just now
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {showTyping && (
                <div className="flex justify-start animate-slide-in">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-1.5 sm:mr-2 flex-shrink-0">
                    <span className="text-white text-[10px] sm:text-xs font-bold">N</span>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl rounded-tl-sm shadow-lg">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area (Visual Only) */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 sm:py-2.5 border border-white/20">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-white placeholder-white/50 text-sm focus:outline-none"
                  disabled
                />
                <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center group flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* Branding Badge */}
          <div className="mt-4 sm:mt-6 flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 sm:px-5 py-2 sm:py-2.5 border border-white/20 shadow-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-xs sm:text-sm text-white font-semibold tracking-wide">
              Powered by NexxUpp
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MainImage;