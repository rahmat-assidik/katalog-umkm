"use client";

import { useEffect } from "react";

export default function DaftarServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.isSecureContext) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error) => {
        console.error("Service worker gagal didaftarkan:", error);
      });
    }
  }, []);
  return null;
}