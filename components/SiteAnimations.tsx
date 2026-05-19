"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SiteAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const cleanups: Array<() => void> = [];

    const context = gsap.context(() => {
      gsap.from("[data-animate='nav']", {
        y: -16,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.06
      });

      gsap.from("[data-animate='title']", {
        y: 22,
        scale: 0.94,
        opacity: 0,
        duration: 0.65,
        ease: "back.out(1.9)",
        stagger: 0.08
      });

      gsap.utils.toArray<HTMLElement>("[data-animate='card'], [data-animate='image']").forEach((element) => {
        gsap.from(element, {
          y: 34,
          scale: element.dataset.animate === "card" ? 0.97 : 1.04,
          opacity: 0,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-animate='button']").forEach((button) => {
        const enter = () => gsap.to(button, { y: -2, scale: 1.04, duration: 0.18, ease: "back.out(2.2)" });
        const leave = () => gsap.to(button, { y: 0, scale: 1, duration: 0.2, ease: "power2.out" });
        const press = () => gsap.to(button, { y: 3, scale: 0.96, duration: 0.08, ease: "power2.out" });
        button.addEventListener("pointerenter", enter);
        button.addEventListener("pointerleave", leave);
        button.addEventListener("pointerdown", press);
        button.addEventListener("pointerup", enter);
        cleanups.push(() => {
          button.removeEventListener("pointerenter", enter);
          button.removeEventListener("pointerleave", leave);
          button.removeEventListener("pointerdown", press);
          button.removeEventListener("pointerup", enter);
        });
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return null;
}
