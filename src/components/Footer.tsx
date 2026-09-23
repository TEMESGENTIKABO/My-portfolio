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
  github: <FiGithub className="h-5 w-5" />,
  linkedin: <FiLinkedin className="h-5 w-5" />,
  twitter: <FiTwitter className="h-5 w-5" />,
  email: <FiMail className="h-5 w-5" />,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Link
        href="/contact"
        className="group block border-b border-line py-14 transition-colors hover:bg-white/[0.02] md:py-20"
      >
        <Marquee
          items={["Let's build something great"]}
          textClassName="text-paper transition-colors group-hover:text-accent-soft"
        />
      </Link>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg tracking-tight">
              Temesgen Gebremariam
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper-dim">
              Full-stack developer building scalable web &amp; mobile products
              from Nanjing, China.
            </p>
            <div className="mt-6 flex gap-4">
              {contactData.socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-paper-dim transition-colors hover:text-accent"
                >
                  {socialIcons[s.icon]}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-widest text-paper-faint">
              Navigate
            </p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-1.5 text-sm text-paper-dim transition-colors hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper-faint">
              Get in touch
            </p>
            <a
              href={`mailto:${contactData.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-paper-dim transition-colors hover:text-accent"
            >
              {contactData.email} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <p className="mt-3 text-sm text-paper-dim">{contactData.phone}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Temesgen T. Gebremariam. All rights reserved.</p>
          <p>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}