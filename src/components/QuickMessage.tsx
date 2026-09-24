"use client";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { contactData } from "@/data/contact";

export default function QuickMessage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Quick message from ${name || "your site"}`,
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "Anonymous"}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    setOpen(false);
  }

  return (
    <div className="fixed right-0 top-28 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25 }}
            className="w-80 rounded-l-2xl border border-r-0 border-line bg-ink-700 p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Quick message
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-paper-faint hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-paper-faint">
              Opens your email client with this pre-filled.
            </p>
            <form onSubmit={handleSend} className="mt-4 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-sm text-paper placeholder:text-paper-faint outline-none focus:border-accent/50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (optional)"
                className="w-full rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-sm text-paper placeholder:text-paper-faint outline-none focus:border-accent/50"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                className="w-full resize-none rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-sm text-paper placeholder:text-paper-faint outline-none focus:border-accent/50"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
              >
                Send <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="tab"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-l-xl border border-r-0 border-line bg-ink/90 px-3 py-4 text-paper-dim backdrop-blur transition-colors hover:text-accent"
            style={{ writingMode: "vertical-rl" }}
            aria-label="Open quick message panel"
          >
            <MessageCircle className="h-4 w-4 rotate-90" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest">
              Say hi
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
