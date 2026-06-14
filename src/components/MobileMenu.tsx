import { useState } from "react";

type Link = {
  label: string;
  href: string;
};

export default function MobileMenu({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-violet-300/40"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </span>
      </button>

      {open ? (
        <div className="absolute inset-x-5 top-20 rounded-3xl border border-white/10 bg-night/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-audio-unlock={link.href === "#contact" ? "true" : undefined}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.07] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
