"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContextProvider from "@/context/Context";
import Loader from "@/app/loading"; 
import SmoothScrollProvider from "@/components/SmoothScrollProvider"; // ✅ ADD THIS
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";


export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6DXKD8YWEC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6DXKD8YWEC');
          `}
        </Script>
      </head>

      <body className="flex flex-col min-h-screen bg-[#f9f9f9]" suppressHydrationWarning>
        <ContextProvider>

          {/* ✅ SMOOTH SCROLL WRAPPER */}
          <SmoothScrollProvider>

            {/* ✅ GLOBAL LOADER */}
            <Loader />

            {/* ✅ MAIN LAYOUT */}
            <Navbar />
            <main className="pt-20 flex-grow px-2"><ScrollToTop/> {children}</main>
            <Footer />

          </SmoothScrollProvider>

        </ContextProvider>
      </body>
    </html>
  );
}
