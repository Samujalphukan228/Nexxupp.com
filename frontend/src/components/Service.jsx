"use client"

import React, { useRef, useState } from "react";
import { servicesData } from "../assets/assets";

const Service = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDrag = () => setIsDragging(false);

  const onDrag = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-black"></div>
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-gray-500">
              Services
            </span>
            <div className="w-12 h-[1px] bg-black"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight tracking-tight text-black">
            Our <span className="italic font-light">Services</span>
          </h2>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-hidden cursor-grab select-none space-x-8"
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onMouseMove={onDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          onTouchMove={onDrag}
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-80 p-8 rounded-3xl transition-all duration-500 text-center transform border"
            >
              <div className="text-black mb-6 flex justify-center text-5xl">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;