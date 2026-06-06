import blogData from "@/data/blog.json";
import type { BlogItem } from "@/data/types";
import { Reveal } from "../Reveal";

const blog = blogData as BlogItem[];

function formatDate(value: string) {
  const d = new Date(value);
  return isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default function BlogSection() {
  return (
    <section id="blog" className="bg-white py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Blog
        </h2>

        {blog.length === 0 && (
          <p className="text-center text-slate-500 dark:text-neutral-400">
            No posts yet.
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {blog.map((post, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left transition-all hover:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-blue-500">
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                  {post.title}
                </h3>

                <p className="mb-4 flex-1 leading-relaxed text-slate-600 line-clamp-5 dark:text-neutral-300">
                  {post.story}
                </p>

                <div className="mt-auto border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-neutral-700 dark:text-neutral-400">
                  By {post.author} · {formatDate(post.createdAt)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
