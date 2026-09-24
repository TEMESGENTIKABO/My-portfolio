"use client";
import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.4,
  className,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // amount: 0.2 is more reliable than a negative margin on mobile,
  // and avoids the iOS Safari rootMargin quirk.
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion → snap to final value immediately.
    if (reduce) {
      node.textContent = `${target}${suffix}`;
      return;
    }

    // If not yet in view, wait — but set a safety timeout so the
    // number is never stuck at 0 on mobile if the observer fails
    // or the element is already visible but the callback is delayed.
    if (!inView) {
      const fallback = setTimeout(() => {
        if (node.textContent === `0${suffix}`) {
          node.textContent = `${target}${suffix}`;
        }
      }, 1200);
      return () => clearTimeout(fallback);
    }

    const controls = animate(count, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
      onComplete: () => {
        node.textContent = `${target}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, target, suffix, duration, reduce, count]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
