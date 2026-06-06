"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { scrollToSection } from "./BackToHeroButton";
import contact from "@/data/contact.json";
import heroData from "@/data/hero.json";
import type { HeroData } from "@/data/types";
import { asset } from "../lib/asset";

const hero = heroData as HeroData;

const LINKS = [
  { label: "About", id: "aboutme" },
  { label: "Career", id: "career" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-slate-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-black/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <img
            src={asset(hero.profileImage)}
            alt={hero.name}
            className="h-8 w-8 rounded-full border border-slate-200 object-cover dark:border-neutral-700"
          />
          Fredi<span className="text-blue-600">.</span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400"
            >
              {link.label}
            </button>
          ))}
          {contact.resumeUrl && (
            <a
              href={asset(contact.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Resume
            </a>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 dark:border-neutral-700 dark:text-neutral-200"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden dark:border-neutral-800 dark:bg-black">
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="text-left text-sm font-medium text-slate-600 dark:text-neutral-300"
              >
                {link.label}
              </button>
            ))}
            {contact.resumeUrl && (
              <a
                href={asset(contact.resumeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Resume
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
