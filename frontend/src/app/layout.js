"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContextProvider from "@/context/Context";
import Loader from "@/components/Loader";
import "./globals.css";

// Component to scroll to top on route change
function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className="flex flex-col min-h-screen bg-[#f9f9f9]"
        suppressHydrationWarning
      >
        <ContextProvider>
          <Loader />
          <Navbar />
          <ScrollToTop />
          <main className="pt-20 flex-grow px-2">{children}</main>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
