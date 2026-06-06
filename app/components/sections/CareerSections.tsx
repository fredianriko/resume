import careerData from "@/data/career.json";
import type { CareerItem } from "@/data/types";
import { Reveal } from "../Reveal";

const career = careerData as CareerItem[];

export default function CareerSection() {
  return (
    <section id="career" className="bg-slate-50 py-24 dark:bg-black">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Career
        </h2>

        <div className="space-y-6">
          {career.map((job, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900">
                {/* Header: title + period */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <span className="text-sm text-slate-500 dark:text-neutral-400">
                    {job.period}
                  </span>
                </div>

                <p className="mb-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {job.company}
                </p>

                {/* Achievements grouped + aligned under this role */}
                <ul className="space-y-2">
                  {job.achievements.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-slate-600 dark:text-neutral-300"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Key skills for this role */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mt-5 border-t border-slate-200 pt-4 dark:border-neutral-800">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-neutral-500">
                      Key Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
