'use client'; // Mark this as a client component

import { useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContextProvider, { useAppContext } from "@/context/Context";
import { ToastContainer } from "react-toastify";
import Login from "@/components/Login";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  // Ensures client-only rendering for hydration-safe content
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className={mounted ? outfit.className : ""}>
        <ContextProvider>
          {mounted ? <LayoutContent>{children}</LayoutContent> : null}
        </ContextProvider>
        <ToastContainer position="top-middle" autoClose={3000} />
      </body>
    </html>
  );
}

function LayoutContent({ children }) {
  const { token, loading } = useAppContext();

  if (loading) {
    return null; // or a spinner
  }

  if (!token) return <Login />; // show login only if not logged in

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="lg:ml-64 pt-[73px] min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 pt-6">{children}</div>
      </main>
    </>
  );
}
