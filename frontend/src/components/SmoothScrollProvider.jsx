"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null);
    const rafIdRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: true,
            lerp: 0.075, // 🔥 smoother & more natural
            wheelMultiplier: 1.1, // 🔥 better mouse scroll feel
            touchMultiplier: 1.2, // 🔥 smoother on touch devices
        });

        lenisRef.current = lenis;

        const raf = (time) => {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);

        // ✅ Pause Lenis when tab is inactive → improves performance
        const handleVisibility = () => {
            if (document.hidden) {
                lenis.stop();
            } else {
                lenis.start();
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            cancelAnimationFrame(rafIdRef.current);
            document.removeEventListener("visibilitychange", handleVisibility);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
