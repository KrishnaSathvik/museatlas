"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isCurrentSection } from "@/lib/navigation";
import { navLinks } from "@/data/nav";
import { CommandPalette } from "@/components/layout/CommandPalette";

export function Header() {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(false);
        setPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur-sm">
        <div className="container-wide flex h-14 items-center justify-between gap-4 md:h-16">
          <Link href="/" onClick={() => setOpen(false)} className="brand-lockup font-display text-[1.02rem] font-bold tracking-tight no-underline">
            <Image src="/brand/muse-icon.png" alt="" width={48} height={48} className="brand-icon" />
            <span>Muse Atlas</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => {
              const active = isCurrentSection(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-2.5 py-2 text-[0.875rem] no-underline transition ${
                    active ? "text-signal" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setOpen(false); setPaletteOpen(true); }}
              className="rounded-lg border border-rule px-3 py-1.5 text-sm text-muted hover:text-ink"
            >
              Search
            </button>
            <button
              type="button"
              className="rounded-lg border border-rule px-3 py-1.5 text-sm xl:hidden"
              onClick={() => setOpen((v) => !v)}
              ref={menuButtonRef}
              aria-expanded={open}
              aria-label="Menu"
              aria-controls="mobile-navigation"
            >
              Menu
            </button>
          </div>
        </div>

        {open ? (
          <nav id="mobile-navigation" aria-label="Main navigation" className="border-t border-rule bg-paper px-4 py-3 xl:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrentSection(pathname, link.href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-2.5 text-sm no-underline hover:bg-wash ${isCurrentSection(pathname, link.href) ? "text-signal" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>
      {paletteOpen && <CommandPalette open onClose={() => setPaletteOpen(false)} />}
    </>
  );
}
