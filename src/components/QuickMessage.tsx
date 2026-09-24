"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
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
    <div
      className="
        fixed bottom-4 right-4 z-40

        sm:bottom-auto
        sm:right-auto
        sm:left-0
        sm:top-28
      "
    >
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="
              w-[calc(100vw-2rem)]
              max-w-[340px]
              overflow-hidden
              rounded-2xl
              border
              border-line
              bg-ink-700/95
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              backdrop-blur-xl

              sm:w-80
              sm:max-w-none
              sm:rounded-tr-2xl
              sm:rounded-br-2xl
            "
          >
            {/* Mobile header */}
            <div className="relative overflow-hidden border-b border-line px-4 py-4 sm:px-5">
              <div className="absolute inset-0 bg-accent/[0.04]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                    <MessageCircle className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Say hi
                    </p>

                    <p className="mt-0.5 text-xs text-paper-faint">
                      Let&apos;s talk
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close quick message"
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-full
                    text-paper-faint
                    transition-all
                    hover:bg-white/5
                    hover:text-paper
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSend} className="space-y-3 p-4 sm:p-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-line
                  bg-white/[0.025]
                  px-3.5
                  py-2.5
                  text-sm
                  text-paper
                  outline-none
                  transition-colors
                  placeholder:text-paper-faint
                  focus:border-accent/50
                  focus:bg-white/[0.04]
                "
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="
                  w-full
                  rounded-xl
                  border
                  border-line
                  bg-white/[0.025]
                  px-3.5
                  py-2.5
                  text-sm
                  text-paper
                  outline-none
                  transition-colors
                  placeholder:text-paper-faint
                  focus:border-accent/50
                  focus:bg-white/[0.04]
                "
              />

              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-line
                  bg-white/[0.025]
                  px-3.5
                  py-2.5
                  text-sm
                  text-paper
                  outline-none
                  transition-colors
                  placeholder:text-paper-faint
                  focus:border-accent/50
                  focus:bg-white/[0.04]
                "
              />

              <button
                type="submit"
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-accent
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-ink
                  shadow-lg
                  shadow-accent/10
                  transition-all
                  hover:bg-accent-soft
                  hover:shadow-accent/20
                  active:scale-[0.98]
                "
              >
                Send message
                <Send
                  className="
                    h-4 w-4
                    transition-transform
                    group-hover:translate-x-0.5
                  "
                  aria-hidden="true"
                />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="tab"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.04 }}
            aria-label="Open quick message panel"
            className="
              group
              relative
              flex
              h-12
              items-center
              gap-2
              rounded-full
              border
              border-accent/20
              bg-ink/95
              px-4
              text-paper
              shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              backdrop-blur-xl
              transition-all
              hover:border-accent/40
              hover:text-accent

              sm:h-auto
              sm:rounded-tr-xl
              sm:rounded-br-xl
              sm:rounded-tl-none
              sm:rounded-bl-none
              sm:border-b
              sm:border-l-0
              sm:border-r
              sm:border-t
              sm:px-3
              sm:py-4
              sm:[writing-mode:vertical-rl]
            "
          >
            {/* Glow */}
            <span
              className="
                absolute
                -inset-1
                -z-10
                rounded-full
                bg-accent/10
                opacity-0
                blur-md
                transition-opacity
                group-hover:opacity-100
              "
            />

            {/* Icon */}
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-accent/10
                text-accent
                ring-1
                ring-accent/20
                transition-all
                group-hover:bg-accent/20
              "
            >
              <MessageCircle className="h-4 w-4" />
            </span>

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
              Say hi
            </span>

            <Sparkles
              className="
                absolute
                -right-1
                -top-1
                h-3
                w-3
                text-accent
              "
              aria-hidden="true"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
