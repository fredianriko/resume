"use client";

import { useEffect, useState } from "react";

export function BackToHeroButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToHero}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-500"
    >
      ⬆ Back to Top
    </button>
  );
}

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
