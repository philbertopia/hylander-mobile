"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type Sauce = {
  name: string;
  color: string;
  labelStroke: string;
  image: string;
  emojis: string[];
  impactWord: string;
};

const sauces: Sauce[] = [
  { name: "Plain", color: "#087443", labelStroke: "#043b24", image: "/img/roulette/flavors/plain.png", emojis: ["🧂", "🤍", "🥛", "✨"], impactWord: "YUM!" },
  { name: "Jerk", color: "#be185d", labelStroke: "#5f0b2d", image: "/img/roulette/flavors/jerk.png", emojis: ["🌶️", "🔥", "🏝️", "⚡"], impactWord: "ZAP!" },
  { name: "Buffalo", color: "#dc2626", labelStroke: "#7f1111", image: "/img/roulette/flavors/buffalo.png", emojis: ["🔥", "🧡", "🌶️", "💥"], impactWord: "HOT!" },
  { name: "Curry", color: "#f59e0b", labelStroke: "#8a4a04", image: "/img/roulette/flavors/curry.png", emojis: ["🍛", "✨", "💛", "🌶️"], impactWord: "SAUCE!" },
  { name: "BBQ", color: "#7c2d12", labelStroke: "#3f1408", image: "/img/roulette/flavors/bbq.png", emojis: ["🍖", "🔥", "🍯", "💨"], impactWord: "BOOM!" },
  { name: "Lemon Pepper", color: "#65a30d", labelStroke: "#315a06", image: "/img/roulette/flavors/lemon-pepper.png", emojis: ["🍋", "🟡", "✨", "🧂"], impactWord: "POP!" },
  { name: "Mango Pepper", color: "#7c3aed", labelStroke: "#3f1a84", image: "/img/roulette/flavors/mango-pepper.png", emojis: ["🥭", "🌶️", "💥", "🧡"], impactWord: "BAM!" }
];

const workingImage = "/img/roulette/flavors/working.png?v=20260519";
const startImage = "/img/roulette/flavors/start.png?v=20260519";
const sliceSize = 360 / sauces.length;
const loadingPhrases = [
  "Summoning sauce spirits...",
  "Consulting the flavor kaiju...",
  "Shaking the pepper portal...",
  "Waking up the wing wizard...",
  "Negotiating with ranch...",
  "Charging the chop cheese reactor...",
  "Stirring the chaos gravy...",
  "Opening the sauce dimension...",
  "Asking the mango oracle...",
  "Buffalo thunder loading...",
  "Lemon pepper lightning...",
  "Curry comet incoming...",
  "BBQ smoke signal sent...",
  "Jerk volcano rumbling...",
  "Plain but suspicious...",
  "Flavor council voting...",
  "Sauce goblet spinning...",
  "Tiny kaiju taste test...",
  "Seasoning the timeline...",
  "Preparing delicious trouble..."
];
const flavorEmojis: Record<string, string[]> = {
  Plain: ["\u{1F9C2}", "\u{1F90D}", "\u{1F95B}", "\u2728"],
  Jerk: ["\u{1F336}\uFE0F", "\u{1F525}", "\u{1F3DD}\uFE0F", "\u26A1"],
  Buffalo: ["\u{1F525}", "\u{1F9E1}", "\u{1F336}\uFE0F", "\u{1F4A5}"],
  Curry: ["\u{1F35B}", "\u2728", "\u{1F49B}", "\u{1F336}\uFE0F"],
  BBQ: ["\u{1F356}", "\u{1F525}", "\u{1F36F}", "\u{1F4A8}"],
  "Lemon Pepper": ["\u{1F34B}", "\u{1F7E1}", "\u2728", "\u{1F9C2}"],
  "Mango Pepper": ["\u{1F96D}", "\u{1F336}\uFE0F", "\u{1F4A5}", "\u{1F9E1}"]
};

export function SauceRoulette() {
  const [rotation, setRotation] = useState(0);
  const [resultImage, setResultImage] = useState(startImage);
  const [resultAlt, setResultAlt] = useState("Sauce Roulette is ready to spin");
  const [isLoading, setIsLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isImpacting, setIsImpacting] = useState(false);
  const [isWheelImpacting, setIsWheelImpacting] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isTitleCelebrating, setIsTitleCelebrating] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0]);
  const burstRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const imageTokenRef = useRef(0);

  const wheelBackground = useMemo(
    () =>
      `conic-gradient(from ${-sliceSize / 2}deg, ${sauces
        .map((sauce, index) => `${sauce.color} ${index * sliceSize}deg ${(index + 1) * sliceSize}deg`)
        .join(", ")})`,
    []
  );
  const showLoadingPhrase = isLoading && resultImage === workingImage;

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallScreen = () => window.matchMedia("(max-width: 640px)").matches;

  const getAudioContext = () => {
    const audioWindow = window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
    const AudioCtor = audioWindow.AudioContext || audioWindow.webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioRef.current) audioRef.current = new AudioCtor();
    if (audioRef.current.state === "suspended") audioRef.current.resume().catch(() => {});
    return audioRef.current;
  };

  const playTone = (frequency: number, endFrequency: number, startTime: number, duration: number, type: OscillatorType, volume: number) => {
    const context = getAudioContext();
    if (!context || prefersReducedMotion()) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const at = context.currentTime + startTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, at);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, at + duration);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(volume, at + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(at);
    oscillator.stop(at + duration + 0.03);
  };

  const playSpinSound = () => {
    playTone(180, 620, 0, 0.34, "triangle", 0.045);
    playTone(280, 760, 0.08, 0.32, "square", 0.025);
  };

  const playImpactSound = (sauce: Sauce) => {
    const base = { Plain: 260, Jerk: 330, Buffalo: 220, Curry: 294, BBQ: 196, "Lemon Pepper": 392, "Mango Pepper": 349 }[sauce.name] || 260;
    playTone(base * 0.72, base * 0.36, 0, 0.28, "sawtooth", 0.055);
    playTone(base, base * 1.5, 0.08, 0.18, "triangle", 0.045);
    playTone(base * 2, base * 2.4, 0.18, 0.16, "sine", 0.035);
  };

  const swapResultImage = async (src: string, alt: string) => {
    const token = imageTokenRef.current + 1;
    imageTokenRef.current = token;
    setIsChanging(true);
    const nextImage = new window.Image();
    nextImage.decoding = "async";
    nextImage.src = src;
    await Promise.race([
      nextImage.decode?.().catch(() => undefined) ?? Promise.resolve(),
      new Promise((resolve) => window.setTimeout(resolve, 1200))
    ]);
    if (token !== imageTokenRef.current) return;
    setResultImage(src);
    setResultAlt(alt);
    window.setTimeout(() => {
      if (token === imageTokenRef.current) setIsChanging(false);
    }, 90);
  };

  const makeParticle = (emoji: string, startX: number, startY: number, endX: number, endY: number, index: number, hero = false, bounce = false, side = false) => {
    const particle = document.createElement("span");
    const scale = hero ? 2.35 + Math.random() * 1.15 : side ? 1.5 + Math.random() * 1.45 : 1.1 + Math.random() * 1.55;
    const rotate = Math.random() * 760 - 380;
    const duration = hero ? 1100 + Math.random() * 340 : side ? 1200 + Math.random() * 460 : bounce ? 1220 + Math.random() * 560 : 960 + Math.random() * 560;
    particle.className = `emoji-particle${hero ? " is-hero" : ""}${bounce ? " is-bouncy" : ""}${side ? " is-side" : ""}`;
    particle.textContent = emoji;
    particle.style.setProperty("--start-x", `${startX}px`);
    particle.style.setProperty("--start-y", `${startY}px`);
    particle.style.setProperty("--end-x", `${endX}px`);
    particle.style.setProperty("--end-y", `${endY}px`);
    particle.style.setProperty("--mid-x", `${(startX + endX) / 2}px`);
    particle.style.setProperty("--mid-y", `${startY - 42}px`);
    particle.style.setProperty("--scale", scale.toFixed(2));
    particle.style.setProperty("--rotate", `${rotate.toFixed(0)}deg`);
    particle.style.setProperty("--duration", `${duration.toFixed(0)}ms`);
    particle.style.setProperty("--delay", `${(Math.random() * (isSmallScreen() ? 90 : 180)).toFixed(0)}ms`);
    particle.style.setProperty("--bounce-y", "180px");
    particle.style.setProperty("--z", String(index % 3));
    return particle;
  };

  const burstEmojis = (sauce: Sauce) => {
    const layer = burstRef.current;
    const result = resultRef.current;
    const wheel = wheelRef.current;
    const button = buttonRef.current;
    if (!layer || !result || !wheel || !button || prefersReducedMotion()) return;
    layer.replaceChildren();
    const resultRect = result.getBoundingClientRect();
    const wheelRect = wheel.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const small = isSmallScreen();
    const particleDistance = small ? 0.9 : 1.35;
    const origins = [
      { x: resultRect.left + resultRect.width / 2, y: resultRect.top + resultRect.height * 0.62, count: small ? 18 : 34, spread: 210 },
      { x: wheelRect.left + wheelRect.width / 2, y: wheelRect.top + wheelRect.height / 2, count: small ? 14 : 26, spread: 240 },
      { x: buttonRect.left + buttonRect.width / 2, y: buttonRect.top + buttonRect.height / 2, count: small ? 10 : 18, spread: 180 }
    ];
    const particles: HTMLElement[] = [];
    let index = 0;
    const emojis = flavorEmojis[sauce.name] ?? sauce.emojis;
    const emoji = () => emojis[index % emojis.length];

    Array.from({ length: small ? 5 : 10 }).forEach(() => {
      const angle = -150 + Math.random() * 120;
      const distance = (190 + Math.random() * 250) * particleDistance;
      particles.push(makeParticle(emoji(), resultRect.left + resultRect.width / 2, resultRect.top + resultRect.height * 0.58, resultRect.left + resultRect.width / 2 + Math.cos((angle * Math.PI) / 180) * distance, resultRect.top + resultRect.height * 0.58 + Math.sin((angle * Math.PI) / 180) * distance, index, true));
      index += 1;
    });

    origins.forEach((origin) => {
      Array.from({ length: origin.count }).forEach(() => {
        const angle = -90 - origin.spread / 2 + Math.random() * origin.spread;
        const distance = (240 + Math.random() * 520) * particleDistance;
        particles.push(makeParticle(emoji(), origin.x, origin.y, origin.x + Math.cos((angle * Math.PI) / 180) * distance, origin.y + Math.sin((angle * Math.PI) / 180) * distance, index, false, Math.random() > 0.76));
        index += 1;
      });
    });

    Array.from({ length: small ? 14 : 30 }).forEach(() => {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -56 - Math.random() * 120 : window.innerWidth + 56 + Math.random() * 120;
      const startY = window.innerHeight * (0.15 + Math.random() * 0.7);
      const endX = window.innerWidth * (0.22 + Math.random() * 0.56);
      const endY = window.innerHeight * (0.08 + Math.random() * 0.72);
      particles.push(makeParticle(emoji(), startX, startY, endX, endY, index, Math.random() > 0.78, false, true));
      index += 1;
    });

    layer.replaceChildren(...particles);
    window.setTimeout(() => layer.replaceChildren(), 2600);
  };

  const triggerImpact = (sauce: Sauce) => {
    const layer = burstRef.current;
    const result = resultRef.current;
    if (!layer || !result || prefersReducedMotion()) return;
    const rect = result.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.55;
    const screenWash = document.createElement("span");
    const shockwave = document.createElement("span");
    const comicPop = document.createElement("span");
    [screenWash, shockwave, comicPop].forEach((element) => {
      element.style.setProperty("--impact-color", sauce.color);
      element.style.setProperty("--impact-x", `${x}px`);
      element.style.setProperty("--impact-y", `${y}px`);
    });
    screenWash.className = "flavor-screen-wash";
    shockwave.className = "flavor-shockwave";
    comicPop.className = "comic-pop";
    comicPop.textContent = sauce.impactWord;
    layer.append(screenWash, shockwave, comicPop);
    setIsImpacting(false);
    setIsWheelImpacting(false);
    window.requestAnimationFrame(() => {
      setIsImpacting(true);
      setIsWheelImpacting(true);
    });
    window.setTimeout(() => {
      screenWash.remove();
      shockwave.remove();
      comicPop.remove();
      setIsImpacting(false);
      setIsWheelImpacting(false);
    }, 1500);
  };

  const spin = async () => {
    if (isSpinning) return;
    document.body.classList.add("is-sauce-spinning");
    setIsSpinning(true);
    playSpinSound();
    const sauceIndex = Math.floor(Math.random() * sauces.length);
    const sauce = sauces[sauceIndex];
    const targetRotation = ((0 - sauceIndex * sliceSize) % 360 + 360) % 360;
    const currentPosition = ((rotation % 360) + 360) % 360;
    const rotationDelta = (targetRotation - currentPosition + 360) % 360;
    setRotation((current) => current + 1080 + rotationDelta);
    setIsLoading(true);
    const phraseStart = Math.floor(Math.random() * loadingPhrases.length);
    setLoadingPhrase(loadingPhrases[phraseStart]);
    const shouldShowSecondPhrase = Math.random() > 0.35;
    const phraseTimers = shouldShowSecondPhrase ? [840].map((delay, offset) =>
      window.setTimeout(() => {
        setLoadingPhrase(loadingPhrases[(phraseStart + offset + 3 + Math.floor(Math.random() * 6)) % loadingPhrases.length]);
      }, delay)
    ) : [];
    swapResultImage(workingImage, "Sauce Roulette is loading");
    setIsTitleCelebrating(false);
    window.setTimeout(() => setIsTitleCelebrating(true), 160);

    window.setTimeout(async () => {
      phraseTimers.forEach((timer) => window.clearTimeout(timer));
      setIsLoading(false);
      setIsTitleCelebrating(false);
      await swapResultImage(sauce.image, `${sauce.name} sauce result`);
      playImpactSound(sauce);
      burstEmojis(sauce);
      triggerImpact(sauce);
      window.setTimeout(() => {
        document.body.classList.remove("is-sauce-spinning");
        setIsSpinning(false);
      }, 1700);
    }, 1370);
  };

  return (
    <section className="mx-auto mt-16 grid w-full max-w-[760px] justify-items-center max-sm:mt-12" aria-label="Sauce Roulette">
      <article className="relative grid w-full gap-2 overflow-visible rounded-lg border-2 border-black bg-cover bg-center p-3 text-white shadow-[0_18px_44px_rgba(7,7,12,0.28),4px_4px_0_#7c3aed]" style={{ backgroundImage: "url('/img/roulette/ChatGPT Image May 18, 2026, 03_11_10 PM.png?v=20260519')" }} data-animate="card">
        <figure className="pointer-events-none mx-auto -mt-[58px] mb-[-16px] aspect-[974/580] w-[min(92%,540px)] overflow-visible max-sm:-mt-[46px] max-sm:mb-[-12px] max-sm:w-[min(94%,390px)]">
          <div className={`h-full w-full origin-center ${isTitleCelebrating ? "animate-[wheel-impact_680ms_cubic-bezier(0.2,0.9,0.2,1)]" : ""}`}>
            <div className="h-full w-full overflow-hidden">
              <Image className="block h-auto w-full -translate-y-[20.8%]" src="/img/roulette/roulette-title.png" alt="Sauce Roulette" width={1024} height={1536} sizes="(max-width: 640px) 390px, 540px" priority />
            </div>
          </div>
        </figure>

        <div ref={wheelRef} className={`roulette-stage relative mx-auto mt-1 aspect-square w-full max-w-[420px] rounded-full drop-shadow-2xl max-sm:max-w-[320px] ${isWheelImpacting ? "is-impacting" : ""}`} aria-label="Sauce roulette wheel">
          <div className="absolute left-1/2 top-[-8px] z-10 h-0 w-0 -translate-x-1/2 border-l-[19px] border-r-[19px] border-t-[36px] border-l-transparent border-r-transparent border-t-white drop-shadow-[0_4px_0_#000]" />
          <div className="absolute inset-1/2 z-[4] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-black bg-hyGreen shadow-[0_0_0_5px_#fff,0_0_0_10px_#000]" />
          <div className="roulette-wheel relative h-full w-full overflow-hidden rounded-full border-[10px] border-black p-[18px] shadow-[inset_0_0_0_6px_#fff,inset_0_0_0_12px_#12b76a,inset_0_0_0_17px_#000,inset_0_0_38px_rgba(0,0,0,0.42),0_12px_28px_rgba(0,0,0,0.35)]" style={{ background: wheelBackground, transform: `rotate(${rotation}deg)` }}>
            <div className="pointer-events-none absolute inset-[18px] z-[1] rounded-full bg-[radial-gradient(circle_at_36%_24%,rgba(255,255,255,0.24),transparent_24%),radial-gradient(circle_at_50%_50%,transparent_0_58%,rgba(0,0,0,0.18)_73%,rgba(0,0,0,0.42)_100%)]" />
            {sauces.map((sauce, index) => (
              <span key={sauce.name} className="roulette-label absolute inset-[18px] z-[2] flex origin-center items-start justify-center pt-4 text-center font-rounded text-[clamp(1.16rem,4vw,1.68rem)] font-black uppercase leading-[0.9] text-white" style={{ transform: `rotate(${index * sliceSize}deg) translateZ(0)`, "--label-stroke": sauce.labelStroke } as React.CSSProperties}>
                <b className="block w-min max-w-32 leading-tight">{sauce.name}</b>
              </span>
            ))}
          </div>
        </div>

        <button ref={buttonRef} className={`game-button relative mx-auto mt-3 min-h-[58px] w-full max-w-[350px] overflow-hidden rounded-full border-[3px] border-black px-6 text-[clamp(1.4rem,5.4vw,1.9rem)] font-black uppercase text-white shadow-[0_6px_0_#000,0_14px_26px_rgba(236,72,153,0.34),0_0_24px_rgba(236,72,153,0.48),inset_0_4px_0_rgba(255,255,255,0.38),inset_0_-7px_0_rgba(76,29,149,0.42)] disabled:cursor-wait disabled:saturate-75 ${isSpinning ? "is-spinning" : ""}`} type="button" disabled={isSpinning} onClick={spin} data-animate="button">
          Spin Sauce
        </button>

        <div ref={resultRef} className={`game-result relative mt-3 aspect-[3/2] w-full overflow-hidden rounded-3xl border-[3px] border-black bg-black shadow-[0_10px_24px_rgba(0,0,0,0.24)] ${isLoading ? "is-loading" : ""} ${isChanging ? "is-changing" : ""} ${isImpacting ? "is-impacting" : ""}`} data-sauce-result>
          <Image className="h-full w-full object-cover transition" src={resultImage} alt={resultAlt} width={1536} height={1024} unoptimized />
          {showLoadingPhrase ? (
            <span key={loadingPhrase} className="loading-phrase absolute inset-x-[7%] bottom-[8%] text-center text-[clamp(0.92rem,4.3vw,1.85rem)] font-black uppercase leading-[0.95] text-white">
              {loadingPhrase}
            </span>
          ) : null}
        </div>
      </article>
      <div ref={burstRef} className="screen-burst" aria-hidden="true" />
    </section>
  );
}
