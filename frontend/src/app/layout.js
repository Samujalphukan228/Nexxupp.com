"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContextProvider from "@/context/Context";
import Loader from "@/components/Loader";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <html lang="en">
      <body 
        className="flex flex-col min-h-screen bg-[#f9f9f9]"
        suppressHydrationWarning
      >
        <ContextProvider>
          <Loader />
          <Navbar />
          <main className="pt-20 flex-grow px-2">{children}</main>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
