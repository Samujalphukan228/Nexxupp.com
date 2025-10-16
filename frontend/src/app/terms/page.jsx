"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Shield, FileText, Lock, AlertCircle, RefreshCw, Mail } from "lucide-react";

const sections = [
  { id: "1", title: "Acceptance of Terms", icon: Shield, content: "By accessing or using NexxUpp's services, you agree to comply with these Terms & Conditions in full. If you do not agree with any part of these terms, please do not use our services." },
  { id: "2", title: "Scope of Services", icon: FileText, content: "NexxUpp provides professional website design, development, and related digital services. All deliverables are defined in the project brief agreed upon with the client. Any additional requests or services outside the original scope may require a separate agreement and fees." },
  { id: "3", title: "Payment Terms", icon: Lock, content: "All fees for services are specified in the project agreement. Payments are due as outlined in the contract, and work may be paused or delayed if payments are not made on time. All fees are exclusive of applicable taxes unless stated otherwise." },
  { id: "4", title: "No Refund Policy", icon: AlertCircle, content: "Once work has commenced, payments made are non-refundable. NexxUpp does not offer refunds for services that have been delivered or are in progress. Please ensure you fully understand the scope before approving the project." },
  { id: "5", title: "Intellectual Property", icon: RefreshCw, content: "All intellectual property rights of work created by NexxUpp remain with NexxUpp until full payment is received. After full payment, the client is granted ownership rights to the delivered work as specified in the project agreement." },
  { id: "6", title: "Contact", icon: Mail, content: "For any questions regarding these Terms & Conditions or our services, please contact us at contact@nexxupp.com. We are committed to addressing your inquiries promptly and professionally." },
];

export default function TermsPage() {
  const [activeItem, setActiveItem] = useState("item-1");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    setLastUpdated(today);
  }, []);

  return (
    <section className="w-full min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-block p-4 mb-6">
            <Shield className="w-12 h-12 text-gray-800" aria-hidden="true" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
          {lastUpdated && (
            <div className="mt-2 text-sm text-gray-400">
              Last updated: {lastUpdated}
            </div>
          )}
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion
            type="single"
            className="w-full space-y-3"
            defaultValue="item-1"
            onValueChange={setActiveItem}
            collapsible
          >
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <AccordionItem
                  key={section.id}
                  value={`item-${section.id}`}
                  className="border-0 shadow-none bg-transparent transition-all duration-500 ease-out"
                >
                  <AccordionTrigger className="py-5 hover:no-underline text-left group border-0 shadow-none bg-transparent">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-800 group-data-[state=open]:text-blue-400 transition-all duration-500" />
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 group-data-[state=open]:text-blue-400 transition-all duration-500">
                        {section.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-1 border-0 shadow-none bg-transparent">
                    <motion.p
                      className="text-sm md:text-base text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {section.content}
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center text-gray-700 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          By using our services, you acknowledge that you have read and understood these Terms & Conditions.
        </motion.div>
      </div>

      {/* Force all accordion borders and backgrounds removed */}
      <style jsx>{`
        .accordion-item,
        .accordion-trigger,
        .accordion-content {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
      `}</style>
    </section>
  );
}
