"use client";

import React, { useEffect, useCallback, useRef, memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

// Predefined variants with consistent styling
const POPUP_VARIANTS = {
    warning: {
        icon: AlertCircle,
        iconColor: "text-amber-600",
        iconBg: "bg-amber-100",
        accentColor: "bg-amber-600 hover:bg-amber-700",
        borderAccent: "border-t-amber-500",
    },
    success: {
        icon: CheckCircle,
        iconColor: "text-green-600",
        iconBg: "bg-green-100",
        accentColor: "bg-green-600 hover:bg-green-700",
        borderAccent: "border-t-green-500",
    },
    info: {
        icon: Info,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
        accentColor: "bg-blue-600 hover:bg-blue-700",
        borderAccent: "border-t-blue-500",
    },
    error: {
        icon: AlertTriangle,
        iconColor: "text-red-600",
        iconBg: "bg-red-100",
        accentColor: "bg-red-600 hover:bg-red-700",
        borderAccent: "border-t-red-500",
    },
};

// Icon component
const PopupIcon = memo(({ variant }) => {
    if (!variant || !POPUP_VARIANTS[variant]) return null;
    
    const { icon: Icon, iconColor, iconBg } = POPUP_VARIANTS[variant];
    
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
                delay: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mx-auto mb-5 shadow-sm`}
        >
            <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={2.5} />
        </motion.div>
    );
});
PopupIcon.displayName = "PopupIcon";

// Countdown timer
const CountdownTimer = memo(({ seconds, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-xs text-gray-500 font-medium flex items-center justify-center gap-1.5"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
            Auto-closing in {timeLeft}s
        </motion.div>
    );
});
CountdownTimer.displayName = "CountdownTimer";

// Confirmation input
const ConfirmationInput = memo(({ value, onChange, placeholder, error, confirmationText }) => (
    <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mb-6 text-left"
    >
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Type <span className="font-bold text-gray-900">{confirmationText}</span> to confirm
        </label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-4 py-2.5 rounded-lg border-2 ${
                error 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-gray-900 focus:ring-gray-100'
            } focus:outline-none focus:ring-4 transition-all text-sm font-medium`}
            autoFocus
        />
        <AnimatePresence mode="wait">
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-600 mt-2 font-medium flex items-center gap-1"
                >
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </motion.div>
));
ConfirmationInput.displayName = "ConfirmationInput";

// Button component
const PopupButton = memo(({ 
    label, 
    onClick, 
    variant = "secondary", 
    disabled, 
    loading,
    className = ""
}) => {
    const baseStyles = "px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4";
    
    const variants = {
        primary: "bg-gray-900 text-white hover:bg-black focus:ring-gray-200 shadow-sm hover:shadow-md",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-100 shadow-sm hover:shadow-md",
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || loading}
            whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                    <span>Loading...</span>
                </div>
            ) : (
                label
            )}
        </motion.button>
    );
});
PopupButton.displayName = "PopupButton";

// Main component
const PopupV1 = ({
    // Core props
    open = false,
    onCancel,
    onContinue,
    
    // Content
    title = "Confirm Action",
    description = "Are you sure you want to proceed?",
    children,
    
    // Buttons
    cancelLabel = "Cancel",
    continueLabel = "Continue",
    
    // Styling
    variant,
    size = "md",
    
    // Behavior
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    loading = false,
    
    // Advanced
    autoCloseSeconds = null,
    requireConfirmation = false,
    confirmationText = "CONFIRM",
    confirmationPlaceholder = "Type to confirm",
    
    // Callbacks
    onOpen,
    onClose,
}) => {
    const dialogRef = useRef(null);
    const [confirmInput, setConfirmInput] = useState("");
    const [confirmError, setConfirmError] = useState("");

    // Size variants
    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
    };

    // Handle continue with validation
    const handleContinue = useCallback(() => {
        if (requireConfirmation) {
            if (confirmInput.trim() !== confirmationText) {
                setConfirmError(`Please type "${confirmationText}" to confirm`);
                return;
            }
        }
        onContinue?.();
    }, [requireConfirmation, confirmInput, confirmationText, onContinue]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (closeOnEscape && e.key === "Escape" && open) {
                onCancel?.();
            }
        };

        if (open) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
            onOpen?.();
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [open, closeOnEscape, onCancel, onOpen]);

    // Reset on close
    useEffect(() => {
        if (!open) {
            setConfirmInput("");
            setConfirmError("");
            onClose?.();
        }
    }, [open, onClose]);

    const variantStyles = variant ? POPUP_VARIANTS[variant] : null;

    return (
        <AnimatePresence mode="wait">
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={closeOnBackdropClick ? onCancel : undefined}
                    />

                    {/* Dialog */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            ref={dialogRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="popup-title"
                            aria-describedby="popup-description"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ 
                                duration: 0.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className={`
                                relative bg-white rounded-2xl shadow-2xl 
                                ${sizeClasses[size]} w-full 
                                pointer-events-auto
                                ${variantStyles ? `border-t-4 ${variantStyles.borderAccent}` : ''}
                            `}
                        >
                            {/* Close Button */}
                            {showCloseButton && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    onClick={onCancel}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
                                    aria-label="Close dialog"
                                >
                                    <X className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                                </motion.button>
                            )}

                            {/* Content */}
                            <div className="p-6 sm:p-8">
                                {/* Auto-close timer */}
                                {autoCloseSeconds && (
                                    <CountdownTimer 
                                        seconds={autoCloseSeconds} 
                                        onComplete={onCancel} 
                                    />
                                )}

                                {/* Icon */}
                                <PopupIcon variant={variant} />

                                {/* Title */}
                                <motion.h2
                                    id="popup-title"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center"
                                >
                                    {title}
                                </motion.h2>

                                {/* Description */}
                                {description && (
                                    <motion.p
                                        id="popup-description"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-sm sm:text-base text-gray-600 mb-6 text-center leading-relaxed"
                                    >
                                        {description}
                                    </motion.p>
                                )}

                                {/* Custom Content */}
                                {children && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-6"
                                    >
                                        {children}
                                    </motion.div>
                                )}

                                {/* Confirmation Input */}
                                {requireConfirmation && (
                                    <ConfirmationInput
                                        value={confirmInput}
                                        onChange={setConfirmInput}
                                        placeholder={confirmationPlaceholder}
                                        error={confirmError}
                                        confirmationText={confirmationText}
                                    />
                                )}

                                {/* Actions */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="flex flex-col-reverse sm:flex-row gap-3 justify-center"
                                >
                                    <PopupButton
                                        label={cancelLabel}
                                        onClick={onCancel}
                                        variant="secondary"
                                        disabled={loading}
                                        className="flex-1 sm:flex-initial"
                                    />
                                    <PopupButton
                                        label={continueLabel}
                                        onClick={handleContinue}
                                        variant={variant === 'error' ? 'danger' : 'primary'}
                                        disabled={loading}
                                        loading={loading}
                                        className="flex-1 sm:flex-initial"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default memo(PopupV1);