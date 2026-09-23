import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import Marquee from "@/components/Marquee";
import { contactData } from "@/data/contact";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socialIcons: Record<string, React.ReactNode> = {
  github: <FiGithub className="h-4 w-4" />,
  linkedin: <FiLinkedin className="h-4 w-4" />,
  twitter: <FiTwitter className="h-4 w-4" />,
  email: <FiMail className="h-4 w-4" />,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-transparent to-white/[0.015]">
      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      {/* CTA Marquee */}
      <Link
        href="/contact"
        className="group block border-b border-line py-8 transition-colors hover:bg-white/[0.02] md:py-10"
      >
        <Marquee
          items={["Let's build something great"]}
          textClassName="text-paper transition-colors group-hover:text-accent-soft"
        />
      </Link>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        {/* Main row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand + tagline */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.02] font-display text-sm font-medium text-paper transition-colors hover:border-accent/40 hover:text-accent"
              aria-label="Home"
            >
              TG
            </Link>
            <div>
              <p className="font-display text-sm tracking-tight text-paper">
                Temesgen Gebremariam
              </p>
              <p className="text-xs text-paper-dim">
                Full-stack developer · Nanjing, China
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-sm text-paper-dim transition-colors hover:text-paper"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {contactData.socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.name}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-paper-dim transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                {socialIcons[s.icon]}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-xs text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Temesgen T. Gebremariam. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={`mailto:${contactData.email}`}
              className="inline-flex items-center gap-1 transition-colors hover:text-accent"
            >
              {contactData.email}
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <span className="hidden text-paper-faint/50 sm:inline">·</span>
            <span>{contactData.phone}</span>
            <span className="hidden text-paper-faint/50 sm:inline">·</span>
            <span>Built with Next.js &amp; Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
