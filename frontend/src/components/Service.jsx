"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { servicesData } from "../assets/assets";

const Service = () => {
  const sliderRef = useRef(null);
  const [width, setWidth] = useState(0);

  // Calculate total scrollable width dynamically
  useEffect(() => {
    const scrollWidth = sliderRef.current.scrollWidth;
    const clientWidth = sliderRef.current.clientWidth;
    setWidth(scrollWidth - clientWidth);
  }, []);

  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-[1px] bg-black"></div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-500">
              Services
            </span>
            <div className="w-16 h-[1px] bg-black"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight tracking-tight text-black">
            Our <span className="italic font-light">Services</span>
          </h2>
        </div>

        {/* Slider */}
        <motion.div
          ref={sliderRef}
          className="overflow-hidden cursor-grab select-none"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            className="flex gap-10 md:gap-12"
            drag="x"
            dragConstraints={{ left: -width, right: 0 }}
            dragElastic={0.2}
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="flex-shrink-0 w-80 md:w-96 p-10 rounded-3xl border border-gray-200 text-center"
              >
                <div className="text-black mb-6 flex justify-center text-6xl md:text-7xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;
