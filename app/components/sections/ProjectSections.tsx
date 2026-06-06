import projectData from "@/data/projects.json";
import type { ProjectItem } from "@/data/types";
import { Reveal } from "../Reveal";

const projects = projectData as ProjectItem[];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-slate-50 py-24 dark:bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Projects
        </h2>

        {projects.length === 0 && (
          <p className="text-center text-slate-500 dark:text-neutral-400">
            No projects yet.
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 text-left transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-blue-500">
                <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="mb-6 leading-relaxed text-slate-600 dark:text-neutral-300">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-neutral-700/70 dark:text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      🌍 Live Demo
                    </a>
                  )}

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-600 transition hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white"
                    >
                      💻 Source Code
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
