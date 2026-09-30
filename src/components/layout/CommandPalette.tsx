"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchGuide } from "@/lib/search";

type Props = { open: boolean; onClose: () => void };

export function CommandPalette({ open, onClose }: Props) {
  const [q, setQ] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) dialog?.showModal();
    else dialog?.close();
    return () => dialog?.close();
  }, [open]);

  const results = useMemo(() => searchGuide(q), [q]);

  if (!open) return null;

  return (
    <dialog ref={dialogRef} aria-label="Search Muse Atlas" onCancel={onClose} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} className="search-dialog">
      <button className="search-close" onClick={onClose} aria-label="Close search">×</button>
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-rule bg-paper shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          aria-label="Search products, examples and ideas"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, examples and ideas…"
          className="w-full border-b border-rule bg-transparent px-4 py-4 text-base focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
        />
        <p className="search-count" role="status">{results.length} results{q.trim() ? ` for “${q.trim()}”` : " across the guide"}</p>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-sm text-muted">No matches. Try a product name, a task such as “local”, or a concept such as “safety”.</p>
          ) : (
            Array.from(new Set(results.map(result => result.group))).map(group => {
              const hits = results.filter(result => result.group === group);
              if (!hits.length) return null;
              return <section key={group} className="search-group" aria-label={group}>
                <h2>{group}</h2>
                {hits.map(r => {
                  // A full navigation resets update filters before resolving the article anchor.
                  const ResultLink = r.href.startsWith("/updates#") ? "a" : Link;
                  return <ResultLink key={`${r.href}-${r.label}`} href={r.href} onClick={onClose} className="block rounded-xl px-3 py-2.5 no-underline hover:bg-wash">
                  <span className="text-sm font-medium text-ink">{r.label}</span>
                  {r.hint && <p className="mt-0.5 line-clamp-1 text-xs text-muted">{r.hint}</p>}
                </ResultLink>;
                })}
              </section>;
            })
          )}
        </div>
      </div>
    </dialog>
  );
}
