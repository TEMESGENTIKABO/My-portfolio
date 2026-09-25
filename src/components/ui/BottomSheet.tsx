"use client";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end bg-ink/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] w-full overflow-y-auto rounded-t-3xl border-t border-line bg-ink-700 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="flex justify-center pt-3">
              <span
                className="h-1 w-10 rounded-full bg-white/15"
                aria-hidden="true"
              />
            </div>
            <div className="flex items-center justify-between px-5 pb-3 pt-2">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {title}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-paper-faint hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="border-t border-line px-5 pb-6 pt-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
