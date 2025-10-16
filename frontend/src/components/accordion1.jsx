"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Image from "next/image";

const Feature197 = ({ features = [], image = "/images/placeholder.svg" }) => {
  const data = features.length ? features : [];
  const [activeItem, setActiveItem] = useState("item-1");
  
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Accordion Section - No Borders */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Accordion 
              type="single" 
              className="w-full space-y-3" 
              defaultValue="item-1"
              onValueChange={setActiveItem}
            >
              {data.map((tab, index) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className="border-none px-0 data-[state=open]:bg-gray-50/50 rounded-xl transition-all duration-500 ease-out"
                >
                  <AccordionTrigger className="py-4 px-4 hover:no-underline text-left group hover:bg-gray-50/80 rounded-lg transition-colors duration-300">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 group-data-[state=open]:text-blue-600 transition-all duration-500">
                      {tab.title}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 px-4">
                    <motion.p 
                      className="text-sm md:text-base text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {tab.description}
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Image Section - Balanced Size, No Mobile Hover/Shadow */}
          <motion.div 
            className="w-full order-first lg:order-last"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] sm:aspect-[4/3] overflow-hidden rounded-2xl md:shadow-xl group">
              <Image
                src={image}
                alt="Feature preview"
                fill
                className="object-cover md:transition-transform md:duration-700 md:ease-out md:group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export { Feature197 };