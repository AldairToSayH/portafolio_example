import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/contact-theme.mp3";
const STORAGE_KEY = "aldair-contact-music";
const TARGET_VOLUME = 0.25;

type Status = "ready" | "locked" | "playing" | "paused" | "unavailable";

export default function MusicController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const unlockedRef = useRef(false);
  const enabledRef = useRef(true);
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  });
  const [status, setStatus] = useState<Status>("locked");

  enabledRef.current = enabled;

  const stopFade = () => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = (volume: number, after?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    stopFade();
    fadeRef.current = window.setInterval(() => {
      const current = audio.volume;
      const next = current + (volume > current ? 0.03 : -0.03);

      if ((volume > current && next >= volume) || (volume < current && next <= volume)) {
        audio.volume = volume;
        stopFade();
        after?.();
        return;
      }

      audio.volume = Math.max(0, Math.min(TARGET_VOLUME, next));
    }, 80);
  };

  const playSoftly = async () => {
    const audio = audioRef.current;
    if (!audio || !enabledRef.current || !visibleRef.current) return;

    try {
      audio.muted = false;
      await audio.play();
      fadeTo(TARGET_VOLUME);
      setStatus("playing");
    } catch {
      setStatus(unlockedRef.current ? "paused" : "locked");
    }
  };

  const pauseSoftly = () => {
    const audio = audioRef.current;
    if (!audio) return;

    fadeTo(0, () => {
      audio.pause();
      setStatus(enabled ? "paused" : "ready");
    });
  };

  const unlockAudio = async () => {
    const audio = audioRef.current;
    if (!audio || unlockedRef.current) return;

    try {
      audio.volume = 0;
      audio.muted = true;
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
      unlockedRef.current = true;
      setStatus("ready");

      if (visibleRef.current && enabled) {
        await playSoftly();
      }
    } catch {
      setStatus("locked");
    }
  };

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0;
    audioRef.current = audio;

    if (!enabledRef.current) {
      setStatus("ready");
    }

    const markUnavailable = () => setStatus("unavailable");
    audio.addEventListener("error", markUnavailable);

    const contact = document.getElementById("contact");
    const observer = contact
      ? new IntersectionObserver(
          ([entry]) => {
            visibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting && enabledRef.current && unlockedRef.current) {
              void playSoftly();
            } else if (!entry.isIntersecting) {
              pauseSoftly();
            }
          },
          { threshold: 0.35 },
        )
      : null;

    if (contact && observer) observer.observe(contact);

    const unlockTargets = document.querySelectorAll("[data-audio-unlock]");
    unlockTargets.forEach((target) => target.addEventListener("click", unlockAudio));
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      stopFade();
      audio.pause();
      audio.removeEventListener("error", markUnavailable);
      observer?.disconnect();
      unlockTargets.forEach((target) => target.removeEventListener("click", unlockAudio));
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");

    if (!enabled) {
      pauseSoftly();
      return;
    }

    if (visibleRef.current && unlockedRef.current) {
      void playSoftly();
    }
  }, [enabled]);

  const disabled = status === "unavailable";
  const label = disabled ? "Música no disponible" : enabled ? "music on" : "music off";
  const helper = disabled
    ? "Coloca contact-theme.mp3 en public/audio para activar el sonido ambiental."
    : status === "locked"
      ? "Interactúa con la página para habilitar el audio suave de contacto."
      : "El audio ambiental se reproduce suavemente solo mientras esta sección es visible.";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-white">Ambiente de contacto</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{helper}</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-violet-300/25 bg-violet-300/10 px-4 py-2 text-sm font-bold text-violet-100 transition hover:border-violet-200/60 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.035] disabled:text-slate-500"
          aria-pressed={enabled}
          disabled={disabled}
          onClick={() => setEnabled((value) => !value)}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
