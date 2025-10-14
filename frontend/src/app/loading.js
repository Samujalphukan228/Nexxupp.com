"use client";

import { useContext } from "react";
import { AppContext } from "@/context/Context";
import Loader from "@/components/Loader";

export default function GlobalLoader() {
  const { loading } = useContext(AppContext);

  if (!loading) return null; // show nothing if not loading

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Loader />
    </div>
  );
}
