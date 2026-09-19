"use client";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResumeButton({ className }: { className?: string }) {
  return (
    <a
      href="/resume.pdf"
      download="Temesgen_Gebremariam_Resume.pdf"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent",
        className,
      )}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Résumé
    </a>
  );
}
