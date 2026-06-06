import { Navbar } from "./components/Navbar";
import { BackToHeroButton } from "./components/BackToHeroButton";
import HeroSection from "./components/sections/HeroSections";
import AboutSection from "./components/sections/AboutSections";
import CareerSection from "./components/sections/CareerSections";
import EducationSection from "./components/sections/EducationSections";
import ProjectsSection from "./components/sections/ProjectSections";
import BlogSection from "./components/sections/BlogSections";
import ContactSection from "./components/sections/ContactSections";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-neutral-100">
      <Navbar />
      <BackToHeroButton />
      <main>
        <HeroSection />
        <AboutSection />
        <CareerSection />
        <EducationSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500 dark:border-neutral-800 dark:bg-black dark:text-neutral-400">
        © {new Date().getFullYear()} Fredi Anriko. Built with Next.js &amp;
        Tailwind CSS.
      </footer>
    </div>
  );
}
