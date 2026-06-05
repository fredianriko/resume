import careerData from "@/data/career.json";
import type { CareerItem } from "@/data/types";
import { Reveal } from "../Reveal";

const career = careerData as CareerItem[];

export default function CareerSection() {
  return (
    <section id="career" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Career
        </h2>

        <div className="relative space-y-12 border-l-2 border-slate-200 pl-8 dark:border-slate-700">
          {career.map((job, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="relative">
                <span className="absolute -left-[42px] top-1 h-5 w-5 rounded-full border-2 border-slate-50 bg-blue-600 dark:border-slate-950" />

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {job.title}
                </h3>

                <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                  {job.company} | {job.period}
                </p>

                <ul className="list-outside list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
                  {job.achievements.map((item, i) => (
                    <li key={i}>{item}</li>
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
