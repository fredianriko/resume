import aboutData from "@/data/aboutme.json";
import type { AboutData } from "@/data/types";
import { Reveal } from "../Reveal";

const about = aboutData as AboutData;

export default function AboutSection() {
  return (
    <section id="aboutme" className="bg-white py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            About Me
          </h2>

          {about.about.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 leading-relaxed text-slate-600 dark:text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
