"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Optionally unobserve after revealing
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Target all elements with .reveal class
    const targets = document.querySelectorAll(".reveal");
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
}
