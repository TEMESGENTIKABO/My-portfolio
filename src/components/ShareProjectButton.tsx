"use client";
import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { useToast } from "@/context/ToastContext";

export default function ShareProjectButton({ slug }: { slug: string }) {
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/projects/${slug}`;
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      show("Project link copied");
      setTimeout(() => setCopied(false), 1800);
    } else {
      show("Couldn't copy — copy the URL manually");
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Copy link to this project"
      className="inline-flex items-center gap-1.5 text-paper-dim transition-colors hover:text-accent"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
      ) : (
        <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
