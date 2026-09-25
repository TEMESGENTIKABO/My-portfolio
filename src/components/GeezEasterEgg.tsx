"use client";
import { useEffect, useRef } from "react";
import { useToast } from "@/context/ToastContext";

const TRIGGER = "geez";

export default function GeezEasterEgg() {
  const { show } = useToast();
  const bufferRef = useRef("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (typing || e.metaKey || e.ctrlKey || e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(
        -TRIGGER.length,
      );
      if (bufferRef.current === TRIGGER) {
        show("፩ ፪ ፫ — you found the Ge'ez numerals. Check the stats above.");
        bufferRef.current = "";
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  return null;
}
