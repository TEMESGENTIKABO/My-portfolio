"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { useToast } from "@/context/ToastContext";

export default function CopyButton({
  value,
  label = "Copied",
}: {
  value: string;
  label?: string;
}) {
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      show(`${label} to clipboard`);
      setTimeout(() => setCopied(false), 1800);
    } else {
      show("Couldn't copy — try selecting manually");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${value}`}
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-line p-1.5 text-paper-faint transition-colors hover:border-accent/50 hover:text-accent"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
