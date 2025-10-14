"use client";

import { useState } from "react";
import { useAppContext } from "@/context/Context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
    const { loginToken, navigate } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });

    // Form validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const getEmailError = () => {
        if (!touched.email) return "";
        if (!email) return "Email is required";
        if (!validateEmail(email)) return "Please enter a valid email";
        return "";
    };

    const getPasswordError = () => {
        if (!touched.password) return "";
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const isFormValid = email && password && validateEmail(email) && password.length >= 6;

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        setTouched({ email: true, password: true });

        if (!isFormValid) {
            setError("Please fix the errors above");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const success = await loginToken(email, password);

            if (success) {
                setError("");
                // Show success animation before redirect
                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                setError("Invalid email or password. Please try again.");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Login failed. Please check your connection and try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 relative overflow-hidden">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Sign in to access your admin dashboard
                    </p>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={handleLogin}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
                >
                    
                    {/* Global Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4 flex items-start gap-3 animate-shake">
                            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-300 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouched({ ...touched, email: true })}
                                className={`w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl bg-white/5 border-2 ${
                                    getEmailError() 
                                        ? 'border-red-500/50 focus:border-red-500' 
                                        : 'border-white/10 focus:border-blue-500'
                                } text-white placeholder-gray-500 focus:outline-none transition-all duration-300 text-sm sm:text-base`}
                            />
                            {email && !getEmailError() && touched.email && (
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        {getEmailError() && (
                            <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1.5 mt-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {getEmailError()}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-200">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouched({ ...touched, password: true })}
                                className={`w-full pl-12 pr-12 py-3 sm:py-3.5 rounded-xl bg-white/5 border-2 ${
                                    getPasswordError() 
                                        ? 'border-red-500/50 focus:border-red-500' 
                                        : 'border-white/10 focus:border-blue-500'
                                } text-white placeholder-gray-500 focus:outline-none transition-all duration-300 text-sm sm:text-base`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white focus:outline-none transition-colors"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible size={22} />
                                ) : (
                                    <AiOutlineEye size={22} />
                                )}
                            </button>
                        </div>
                        {getPasswordError() && (
                            <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1.5 mt-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {getPasswordError()}
                            </p>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                                    rememberMe 
                                        ? 'bg-blue-500 border-blue-500' 
                                        : 'bg-white/5 border-white/20 group-hover:border-white/40'
                                }`}>
                                    {rememberMe && (
                                        <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                Remember me
                            </span>
                        </label>
                        <button
                            type="button"
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !isFormValid}
                        className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform ${
                            isLoading || !isFormValid
                                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0'
                        } text-white flex items-center justify-center gap-3`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs sm:text-sm">
                            <span className="px-4 text-gray-400 bg-transparent">
                                Secure admin access
                            </span>
                        </div>
                    </div>

                    {/* Security Info */}
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Protected by SSL encryption</span>
                    </div>

                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        © 2024 NexxUpp. All rights reserved.
                    </p>
                </div>

            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                .delay-500 {
                    animation-delay: 500ms;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}