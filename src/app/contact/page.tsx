import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import { contactData } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Temesgen Gebremariam — full-stack developer based in Nanjing, China. Open to opportunities, projects and collaborations.",
};

const socialIcons: Record<string, React.ReactNode> = {
  github: <FiGithub className="h-5 w-5" />,
  linkedin: <FiLinkedin className="h-5 w-5" />,
  twitter: <FiTwitter className="h-5 w-5" />,
  email: <FiMail className="h-5 w-5" />,
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: contactData.email,
    href: `mailto:${contactData.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: contactData.phone,
    href: `tel:${contactData.phone.replace(/[^+\d]/g, "")}`,
  },
  { icon: MapPin, label: "Location", value: "Nanjing, Jiangsu, China" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <div className="grid gap-4 border-b border-line pb-14 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
        <SectionHeading
          index="01"
          eyebrow="Contact"
          title={
            <>
              Let&rsquo;s build
              <br />
              something{" "}
              <span className="italic text-accent-soft">together</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-md leading-relaxed text-paper-dim">
            Have a role, a project, or just a question? Send a message and I
            will get back to you as soon as I can — usually within a day.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-3">
            {channels.map((c) => (
              <div
                key={c.label}
                className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-white/[0.02] p-5"
              >
                <div className="flex items-start gap-4">
                  <c.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-paper-faint">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="mt-1 block text-sm text-paper transition-colors hover:text-accent"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-paper">{c.value}</p>
                    )}
                  </div>
                </div>
                {c.label === "Email" && (
                  <CopyButton value={c.value} label="Email" />
                )}
              </div>
            ))}

            <div className="flex gap-4 rounded-2xl border border-line bg-white/[0.02] p-5">
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

            <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-5">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Currently available
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                Open to freelance projects, full-time roles, and collaborations
                starting immediately.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-white/[0.02] p-7 sm:p-9">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
