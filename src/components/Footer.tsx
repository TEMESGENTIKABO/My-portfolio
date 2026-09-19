import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
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
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg tracking-tight">
              Temesgen Gebremariam
            </p>
            <p className="mt-1 text-sm text-paper-dim">
              Full-Stack Developer — Nanjing, China
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper-dim"
            aria-label="Footer"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4">
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
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Temesgen T. Gebremariam. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}
