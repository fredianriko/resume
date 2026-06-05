import educationData from "@/data/education.json";
import type { EducationItem } from "@/data/types";
import { Reveal } from "../Reveal";

const education = educationData as EducationItem[];

export default function EducationSection() {
  return (
    <section id="education" className="bg-white py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Education
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {item.degree}
                </h3>
                <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                  {item.school} | {item.period}
                </p>
                <ul className="list-outside list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
                  {item.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
