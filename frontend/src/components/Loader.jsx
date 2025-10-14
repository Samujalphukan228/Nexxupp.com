"use client";

import { useContext, useEffect } from "react";
import { AppContext } from "@/context/Context";

export default function GlobalLoader() {
  const { loading } = useContext(AppContext);

  // Optional: prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-100">
      <div className="relative w-40 h-40">
        {/* Outer Track */}
        <div className="absolute inset-0 rounded-full shadow-[inset_-0.1em_-0.1em_0.2em_#d1d1d1,inset_0.1em_0.1em_0.2em_#ffffff] bg-gray-100"></div>

        {/* Inner Track */}
        <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full border-[2em] border-gray-200 shadow-[inset_-0.1em_-0.1em_0.2em_#d1d1d1,inset_0.1em_0.1em_0.2em_#ffffff]"></div>

        {/* Orb */}
        <div
          className="absolute w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.2),inset_0_2px_4px_rgba(0,0,0,0.2)]"
          style={{
            background: "radial-gradient(circle at 30% 30%, #ffffff, #ccc)",
            animation: "spinOrb 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite",
          }}
        ></div>

        <style jsx>{`
          @keyframes spinOrb {
            0% {
              transform: translate(-50%, -50%) rotate(90deg) translate(3em) rotate(-90deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(450deg) translate(3em) rotate(-450deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
