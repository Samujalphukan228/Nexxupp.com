"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const tabs = [
    { name: "Mails", href: "/mails" },
    { name: "Projects", href: "/projects" },
    { name: "Prices", href: "/prices" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block fixed left-0 top-[73px] h-[calc(100vh-73px)] w-72 bg-gradient-to-b from-white to-gray-50/50 dark:from-neutral-900 dark:to-neutral-950 border-r border-gray-200/50 dark:border-neutral-800/50 backdrop-blur-xl z-40 shadow-sm">
            <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                    <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4">
                        Navigation
                    </h2>
                </div>

                <ul className="relative flex flex-col space-y-2">
                    {tabs.map((tab, index) => {
                        const isActive = pathname === tab.href || pathname.startsWith(tab.href + "/");

                        return (
                            <motion.li 
                                key={tab.name} 
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBg"
                                        className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 rounded-xl shadow-lg"
                                        transition={{ 
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30
                                        }}
                                    />
                                )}

                                <Link
                                    href={tab.href}
                                    className={`relative z-10 block px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                                        isActive
                                            ? "text-white dark:text-black"
                                            : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-neutral-800/60 hover:shadow-md"
                                    }`}
                                >
                                    <span className="flex items-center justify-between">
                                        <span>{tab.name}</span>
                                        {isActive && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-2 h-2 rounded-full bg-white dark:bg-black"
                                            />
                                        )}
                                    </span>
                                </Link>
                            </motion.li>
                        );
                    })}
                </ul>

                {/* Decorative Element */}
                <div className="mt-auto pt-8">
                    <div className="px-4 py-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-neutral-800 dark:to-neutral-900 border border-gray-200/50 dark:border-neutral-700/50">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            NexxUpp Admin
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Dashboard v1.0
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}