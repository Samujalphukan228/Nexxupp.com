"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const MainImage = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [typingFrom, setTypingFrom] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [demoComplete, setDemoComplete] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const demoMessages = [
    { id: 1, type: 'received', text: 'Do you create professional websites?', delay: 500, sender: 'Client' },
    { id: 2, type: 'sent', text: 'Yes! We design sites that grow your business', delay: 1800, sender: 'NexxUpp' },
    { id: 3, type: 'received', text: "That's exactly what I need!", delay: 3200, sender: 'Client' },
    { id: 4, type: 'sent', text: "Let's bring your vision to life! 🚀", delay: 4500, sender: 'NexxUpp' }
  ];

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 60)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [userInput]);

  // Smooth scroll to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, showTyping]);

  // Demo messages animation
  useEffect(() => {
    let timeoutIds = [];

    demoMessages.forEach((message, index) => {
      const id = setTimeout(() => {
        setShowTyping(true);
        setTypingFrom(message.type);

        const typingTimeout = setTimeout(() => {
          setShowTyping(false);
          setTypingFrom(null);
          setVisibleMessages(prev => [...prev, { ...message, uniqueKey: `demo-${message.id}`, isDemo: true }]);
          
          // Enable user input after demo completes
          if (index === demoMessages.length - 1) {
            setTimeout(() => {
              setDemoComplete(true);
            }, 500);
          }
        }, 800);

        timeoutIds.push(typingTimeout);
      }, message.delay);

      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(id => clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle user message send
  const handleSendMessage = (e) => {
    e?.preventDefault();
    
    if (!userInput.trim() || !demoComplete) return;

    const newMessage = {
      id: Date.now(),
      type: 'sent',
      text: userInput.trim(),
      sender: 'You',
      uniqueKey: `user-${Date.now()}`,
      isDemo: false
    };

    setVisibleMessages(prev => [...prev, newMessage]);
    setUserInput('');

    // Simulate response after user message
    setTimeout(() => {
      setShowTyping(true);
      setTypingFrom('received');

      setTimeout(() => {
        setShowTyping(false);
        setTypingFrom(null);
        
        const responses = [
          "Thanks for your message! We'll get back to you soon. 😊",
          "Great question! Our team will respond shortly.",
          "We appreciate your interest! Let's discuss this further.",
          "Interesting! Tell us more about your project.",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
          id: Date.now() + 1,
          type: 'received',
          text: randomResponse,
          sender: 'NexxUpp',
          uniqueKey: `response-${Date.now()}`,
          isDemo: false
        };
        
        setVisibleMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }, 500);
  };

  // Handle Enter key (send) and Shift+Enter (new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pb-4 sm:pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <Image
          src="/image-nexx.avif"
          alt="Nexx Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/40" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        <div className="absolute inset-0 flex flex-col justify-center items-center px-3 sm:px-6">
          {/* Chat Box */}
          <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg h-[460px] sm:h-[500px] md:h-[520px] bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl p-4 sm:p-5 flex flex-col">
            
            {/* Chat Header - SMALLER */}
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10 flex-shrink-0">
              <div className="relative">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white/90 animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-[13px] sm:text-sm truncate">Contact@nexxUpp.com</h3>
                <p className="text-white/60 text-[10px] sm:text-[11px] truncate flex items-center gap-1">
                  {showTyping && typingFrom === 'received' ? (
                    <>
                      <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                      typing...
                    </>
                  ) : (
                    <>
                      <span className="w-1 h-1 rounded-full bg-green-400"></span>
                      Online
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Messages Container - MORE SPACE */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto scrollbar-hide space-y-2.5 sm:space-y-3 scroll-smooth"
            >
              <AnimatePresence mode="popLayout">
                {visibleMessages.map((message) => (
                  <motion.div
                    key={message.uniqueKey}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'received' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-1.5 sm:mr-2 flex-shrink-0 mt-auto mb-0.5">
                        <span className="text-white text-[10px] sm:text-xs font-bold">N</span>
                      </div>
                    )}
                    <div className="max-w-[80%] sm:max-w-[75%]">
                      <div
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg transition-all duration-200 ${
                          message.type === 'sent'
                            ? 'bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-xl sm:rounded-2xl rounded-tr-sm'
                            : 'bg-white/95 backdrop-blur-md text-gray-800 rounded-xl sm:rounded-2xl rounded-tl-sm'
                        }`}
                      >
                        <p className="text-[13px] sm:text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">
                          {message.text}
                        </p>
                      </div>
                      <p className={`text-[9px] sm:text-[10px] text-white/50 mt-0.5 px-1 ${message.type === 'sent' ? 'text-right' : 'text-left'}`}>
                        Just now
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {showTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${typingFrom === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    {typingFrom === 'received' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-1.5 sm:mr-2 flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs font-bold">N</span>
                      </div>
                    )}
                    
                    <div className={`px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg ${
                      typingFrom === 'sent'
                        ? 'bg-gradient-to-br from-black via-gray-900 to-black rounded-xl sm:rounded-2xl rounded-tr-sm'
                        : 'bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl rounded-tl-sm'
                    }`}>
                      <div className="flex gap-1">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce ${typingFrom === 'sent' ? 'bg-white/60' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce ${typingFrom === 'sent' ? 'bg-white/60' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce ${typingFrom === 'sent' ? 'bg-white/60' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - SMALLER TEXTAREA */}
            <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-white/10 flex-shrink-0">
              <div className={`flex items-end gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 border transition-colors ${
                demoComplete 
                  ? 'border-white/20 hover:border-white/30' 
                  : 'border-white/10 opacity-50'
              }`}>
                <textarea
                  ref={textareaRef}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={demoComplete ? "Type your message..." : "Wait for demo..."}
                  className="flex-1 bg-transparent text-white placeholder-white/50 text-[13px] sm:text-sm focus:outline-none disabled:cursor-not-allowed resize-none min-h-[20px] max-h-[60px] leading-normal"
                  disabled={!demoComplete}
                  rows={1}
                  style={{ height: '20px' }}
                />
                <button 
                  type="submit"
                  disabled={!demoComplete || !userInput.trim()}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center group flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              {demoComplete && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] text-white/40 mt-1.5 text-center"
                >
                  Enter to send • Shift+Enter for new line
                </motion.p>
              )}
            </form>

          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </motion.div>
  );
};

export default MainImage;