import aboutData from "@/data/aboutme.json";
import type { AboutData } from "@/data/types";
import { Reveal } from "../Reveal";

const about = aboutData as AboutData;

export default function AboutSection() {
  return (
    <section
      id="aboutme"
      className="bg-white py-24 dark:bg-slate-900"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-start">
        <Reveal className="md:w-2/3">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            About Me
          </h2>

          {about.about.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="md:w-1/3">
          <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
            Key Skills
          </h3>

          <ul className="flex flex-wrap gap-2">
            {about.skills.map((skill, index) => (
              <li
                key={index}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
