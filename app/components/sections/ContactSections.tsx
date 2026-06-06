import contactData from "@/data/contact.json";
import type { ContactData } from "@/data/types";
import { Reveal } from "../Reveal";
import { asset } from "../../lib/asset";

const contact = contactData as ContactData;

export default function ContactSection() {
  const items = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
    { label: "GitHub", value: contact.github, href: contact.github },
  ].filter((i) => i.value);

  return (
    <section id="contact" className="bg-slate-50 py-24 dark:bg-black">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="mb-10 text-slate-600 dark:text-neutral-300">
            Open to software engineering and project management opportunities.
            {contact.location ? ` Based in ${contact.location}.` : ""}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="w-full rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600 sm:w-auto dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          {contact.resumeUrl && (
            <div className="mt-8">
              <a
                href={asset(contact.resumeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Download Resume
              </a>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
