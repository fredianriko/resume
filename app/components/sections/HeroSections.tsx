"use client";

import heroData from "@/data/hero.json";
import contactData from "@/data/contact.json";
import type { HeroData, ContactData } from "@/data/types";
import { scrollToSection } from "../BackToHeroButton";
import { RotatingText } from "../RotatingText";
import { asset } from "../../lib/asset";

const hero = heroData as HeroData;
const contact = contactData as ContactData;

// Rotating job titles for personal branding. Edit to taste.
const ROLES = ["Software Engineer", "Project Manager", "Backend Developer"];

// Primary CTA is driven by the first Hero button in the CMS, with a fallback.
const primaryCta = hero.buttons[0] ?? { label: "View My Work", href: "#projects" };

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white px-6 dark:from-black dark:to-neutral-950"
    >
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-600/20" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/10" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 font-medium text-blue-600 dark:text-blue-400">
          Hi, I&apos;m
        </p>

        <h1 className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl dark:from-white dark:to-neutral-400">
          {hero.name}
        </h1>

        <div className="mt-4 flex items-center justify-center gap-2 text-2xl font-semibold text-slate-700 md:text-3xl dark:text-neutral-200">
          <span className="text-blue-600 dark:text-blue-400">▸</span>
          <RotatingText items={ROLES} />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-neutral-300">
          {hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollToSection(primaryCta.href.replace("#", ""))}
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-500"
          >
            {primaryCta.label}
          </button>

          {contact.resumeUrl && (
            <a
              href={asset(contact.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Download Resume
            </a>
          )}
        </div>

        {/* Social links */}
        <div className="mt-8 flex justify-center gap-3">
          {contact.linkedin && (
            <SocialLink href={contact.linkedin} label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </SocialLink>
          )}
          {contact.github && (
            <SocialLink href={contact.github} label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
              </svg>
            </SocialLink>
          )}
          {contact.email && (
            <SocialLink href={`mailto:${contact.email}`} label="Email">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
            </SocialLink>
          )}
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
    >
      {children}
    </a>
  );
}
