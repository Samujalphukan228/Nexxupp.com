"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PopupV1({
    open,
    onCancel,
    onContinue,
    title = "You have to select a plan first",
    description = "Continue to view our pricing options and choose what fits you best.",
    cancelLabel = "Cancel",
    continueLabel = "Continue",
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="popup-v1-title"
                        className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-sm w-[90%] text-center border border-gray-200"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <h2 id="popup-v1-title" className="text-xl font-semibold text-gray-900 mb-3">
                            {title}
                        </h2>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            {description}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={onCancel}
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-5 rounded-full transition-all"
                            >
                                {cancelLabel}
                            </Button>
                            <Button
                                onClick={onContinue}
                                className="bg-black text-white hover:bg-gray-900 px-5 rounded-full transition-all"
                            >
                                {continueLabel}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
