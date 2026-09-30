"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { DiagramNode, NodeRole } from "@/components/diagrams/types";

export type { DiagramNode, NodeRole };

type PathMap = Record<string, string[]>;

function nodeClass(role: NodeRole = "secondary", state: "idle" | "active" | "dim") {
  const base =
    "inline-flex items-center justify-center rounded-[14px] border text-center transition duration-150 select-none";
  const sizes =
    role === "root" || role === "primary"
      ? "min-h-11 px-4 py-2.5 text-[0.9375rem] font-semibold tracking-[-0.01em]"
      : role === "tool"
        ? "min-h-9 px-3 py-2 text-[0.8125rem] font-medium"
        : role === "output"
          ? "min-h-11 px-4 py-2.5 text-[0.9375rem] font-semibold"
          : "min-h-10 px-3.5 py-2.5 text-sm font-medium";

  if (state === "dim") {
    return `${base} ${sizes} border-[#e8eaed] bg-white/70 text-[#b0b4bb]`;
  }
  if (state === "active") {
    return `${base} ${sizes} border-signal bg-signal text-white shadow-[0_1px_2px_rgba(6,104,225,0.22)]`;
  }
  if (role === "root" || role === "output") {
    return `${base} ${sizes} border-signal bg-signal text-white shadow-[0_1px_2px_rgba(6,104,225,0.22)]`;
  }
  if (role === "primary") {
    return `${base} ${sizes} border-[#6b9ae8] bg-[#f3f8ff] text-ink shadow-[0_1px_0_rgba(17,17,17,0.04)]`;
  }
  if (role === "tool") {
    return `${base} ${sizes} border-[#e2e5ea] bg-[#fafbfc] text-ink hover:border-[#b7c9e8] hover:bg-white`;
  }
  return `${base} ${sizes} border-[#e2e5ea] bg-white text-ink shadow-[0_1px_0_rgba(17,17,17,0.03)] hover:border-[#b7c9e8]`;
}

function DiagramNodeView({
  node,
  state,
  onFocus,
  className = "",
}: {
  node: DiagramNode;
  state: "idle" | "active" | "dim";
  onFocus: (id: string | null) => void;
  className?: string;
}) {
  const cls = `${nodeClass(node.role, state)} ${className}`;
  const handlers = {
    onMouseEnter: () => onFocus(node.id),
    onMouseLeave: () => onFocus(null),
    onFocus: () => onFocus(node.id),
    onBlur: () => onFocus(null),
  };

  if (node.href) {
    return (
      <Link href={node.href} className={`${cls} no-underline`} {...handlers}>
        {node.label}
      </Link>
    );
  }
  return (
    <div className={cls} tabIndex={0} {...handlers}>
      {node.label}
    </div>
  );
}

function Canvas({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`diagram-canvas relative overflow-hidden rounded-2xl border border-[#e8eaed] p-5 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2.5 text-[0.65rem] font-medium tracking-[0.16em] text-[#8a919c] uppercase">
      {children}
    </p>
  );
}

function usePathState(paths: PathMap) {
  const [focus, setFocus] = useState<string | null>(null);
  const activeIds = useMemo(() => {
    if (!focus) return new Set<string>();
    return new Set(paths[focus] ?? [focus]);
  }, [focus, paths]);

  function stateFor(id: string): "idle" | "active" | "dim" {
    if (!focus) return "idle";
    return activeIds.has(id) ? "active" : "dim";
  }

  function lineActive(ids: string[]) {
    if (!focus) return false;
    return ids.every((id) => activeIds.has(id));
  }

  return { focus, setFocus, stateFor, lineActive };
}

function stroke(active: boolean, idle = "#d0d5dd") {
  return active ? "var(--signal)" : idle;
}

/* -------------------------------------------------------------------------- */
/* 1. Platform map — hero                                                     */
/* -------------------------------------------------------------------------- */

export function PlatformMap({
  root,
  columns,
  className = "",
}: {
  root: DiagramNode;
  columns: { title: string; nodes: DiagramNode[] }[];
  className?: string;
}) {
  const paths: PathMap = useMemo(() => {
    const map: PathMap = { [root.id]: [root.id] };
    for (const col of columns) {
      for (const n of col.nodes) {
        map[n.id] = [root.id, n.id];
        map[root.id].push(n.id);
      }
    }
    return map;
  }, [root, columns]);

  const { setFocus, stateFor, lineActive } = usePathState(paths);
  const colCount = columns.length;

  return (
    <Canvas label="Muse platform map" className={className}>
      <div className="mx-auto w-full max-w-[34rem]">
        <div className="flex justify-center">
          <DiagramNodeView node={{ ...root, role: "root" }} state={stateFor(root.id)} onFocus={setFocus} className="min-w-[7.5rem]" />
        </div>

        <svg className="mx-auto mt-1 block h-12 w-full" viewBox="0 0 360 48" aria-hidden>
          <path d="M180 0 V14" stroke={stroke(lineActive([root.id]))} strokeWidth="1.5" fill="none" />
          <path
            d="M48 14 H312"
            stroke={stroke(lineActive([root.id]))}
            strokeWidth="1.5"
            fill="none"
          />
          {columns.map((col, i) => {
            const x = colCount === 1 ? 180 : 48 + (i * 264) / Math.max(colCount - 1, 1);
            const active = lineActive([root.id, ...col.nodes.map((n) => n.id).slice(0, 1)]);
            return (
              <path
                key={col.title}
                d={`M${x} 14 V48`}
                stroke={stroke(Boolean(active) || stateFor(root.id) === "active")}
                strokeWidth="1.5"
                fill="none"
              />
            );
          })}
        </svg>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${Math.min(colCount, 3)}, minmax(0, 1fr))` }}
        >
          {columns.map((col) => (
            <div key={col.title} className="rounded-[1.05rem] bg-white/70 p-3 ring-1 ring-[#e8eaed] sm:p-3.5">
              <SectionLabel>{col.title}</SectionLabel>
              <ul className="space-y-2">
                {col.nodes.map((node) => (
                  <li key={node.id} className="flex">
                    <DiagramNodeView
                      node={{ ...node, role: node.role ?? "tool" }}
                      state={stateFor(node.id)}
                      onFocus={setFocus}
                      className="w-full"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Canvas>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Workflow diagram — branched how-it-works                                */
/* -------------------------------------------------------------------------- */

export function WorkflowDiagram({
  className = "",
  onSelect,
}: {
  className?: string;
  onSelect?: (id: string | null) => void;
}) {
  const nodes = {
    request: { id: "request", label: "User Request", role: "secondary" as const },
    model: { id: "model", label: "Muse Model", role: "primary" as const },
    plan: { id: "plan", label: "Planning & Reasoning", role: "secondary" as const },
    browser: { id: "browser", label: "Browser", role: "tool" as const },
    code: { id: "code", label: "Code", role: "tool" as const },
    files: { id: "files", label: "Files", role: "tool" as const },
    result: { id: "result", label: "Result / Action", role: "output" as const },
  };

  const paths: PathMap = {
    request: ["request", "model", "plan", "browser", "code", "files", "result"],
    model: ["request", "model", "plan", "browser", "code", "files", "result"],
    plan: ["model", "plan", "browser", "code", "files", "result"],
    browser: ["plan", "browser", "result"],
    code: ["plan", "code", "result"],
    files: ["plan", "files", "result"],
    result: ["plan", "browser", "code", "files", "result"],
  };

  const { focus, setFocus, stateFor, lineActive } = usePathState(paths);

  function focusNode(id: string | null) {
    setFocus(id);
    onSelect?.(id);
  }

  return (
    <Canvas label="How Muse works workflow" className={className}>
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <Zone title="Input">
          <DiagramNodeView
            node={nodes.request}
            state={stateFor("request")}
            onFocus={focusNode}
            className="w-full"
          />
        </Zone>

        <Rail active={lineActive(["request", "model"])} />

        <Zone title="Intelligence">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <DiagramNodeView
              node={nodes.model}
              state={stateFor("model")}
              onFocus={focusNode}
              className="w-full sm:flex-1"
            />
            <svg className="mx-auto hidden h-3 w-10 shrink-0 sm:block" viewBox="0 0 40 12" aria-hidden>
              <path
                d="M0 6 H28"
                stroke={stroke(lineActive(["model", "plan"]))}
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M24 2 L32 6 L24 10"
                stroke={stroke(lineActive(["model", "plan"]))}
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <svg className="mx-auto h-8 w-3 sm:hidden" viewBox="0 0 12 32" aria-hidden>
              <path
                d="M6 0 V20"
                stroke={stroke(lineActive(["model", "plan"]))}
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M2 16 L6 24 L10 16"
                stroke={stroke(lineActive(["model", "plan"]))}
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <DiagramNodeView
              node={nodes.plan}
              state={stateFor("plan")}
              onFocus={focusNode}
              className="w-full sm:flex-1"
            />
          </div>
        </Zone>

        <svg className="mx-auto h-12 w-full max-w-md" viewBox="0 0 360 48" aria-hidden>
          <path d="M180 0 V10" stroke={stroke(lineActive(["plan"]))} strokeWidth="1.5" fill="none" />
          <path d="M60 10 H300" stroke={stroke(lineActive(["plan"]))} strokeWidth="1.5" fill="none" />
          {[
            { x: 60, ids: ["plan", "browser"] },
            { x: 180, ids: ["plan", "code"] },
            { x: 300, ids: ["plan", "files"] },
          ].map(({ x, ids }) => (
            <path
              key={x}
              d={`M${x} 10 V48`}
              stroke={stroke(lineActive(ids))}
              strokeWidth="1.5"
              fill="none"
            />
          ))}
        </svg>

        <Zone title="Execution">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[nodes.browser, nodes.code, nodes.files].map((n) => (
              <DiagramNodeView
                key={n.id}
                node={n}
                state={stateFor(n.id)}
                onFocus={focusNode}
                className="w-full"
              />
            ))}
          </div>
        </Zone>

        <svg className="mx-auto h-12 w-full max-w-md" viewBox="0 0 360 48" aria-hidden>
          {[
            { x: 60, ids: ["browser", "result"] },
            { x: 180, ids: ["code", "result"] },
            { x: 300, ids: ["files", "result"] },
          ].map(({ x, ids }) => (
            <path
              key={x}
              d={`M${x} 0 V16`}
              stroke={stroke(lineActive(ids))}
              strokeWidth="1.5"
              fill="none"
            />
          ))}
          <path d="M60 16 H300" stroke={stroke(lineActive(["result"]))} strokeWidth="1.5" fill="none" />
          <path d="M180 16 V40" stroke={stroke(lineActive(["result"]))} strokeWidth="1.5" fill="none" />
          <path
            d="M176 34 L180 42 L184 34"
            stroke={stroke(lineActive(["result"]))}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        <Zone title="Output">
          <DiagramNodeView
            node={nodes.result}
            state={stateFor("result")}
            onFocus={focusNode}
            className="w-full"
          />
        </Zone>

        {focus ? (
          <p className="mt-5 text-center text-sm text-muted">{focusCopy[focus] ?? ""}</p>
        ) : (
          <p className="mt-5 text-center text-sm text-subtle">
            Hover a node to highlight its path through the system.
          </p>
        )}
      </div>
    </Canvas>
  );
}

function Rail({ active }: { active: boolean }) {
  return (
    <svg className="mx-auto h-8 w-3" viewBox="0 0 12 32" aria-hidden>
      <path d="M6 0 V20" stroke={stroke(active)} strokeWidth="1.5" fill="none" />
      <path d="M2 16 L6 24 L10 16" stroke={stroke(active)} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const focusCopy: Record<string, string> = {
  request: "A goal or task enters the system.",
  model: "Muse Model interprets the request and decides what work is needed.",
  plan: "Planning breaks the goal into steps and chooses tools.",
  browser: "Browser tools inspect and act on web pages.",
  code: "Code tools edit, run and validate software.",
  files: "File tools read and write documents and artifacts.",
  result: "The system returns a result or takes an approved action.",
};

function Zone({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.05rem] bg-white/70 px-3.5 py-3.5 ring-1 ring-[#e8eaed] sm:px-4 sm:py-4">
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Architecture map — layered system                                       */
/* -------------------------------------------------------------------------- */

export function ArchitectureMap({
  layers,
  className = "",
}: {
  layers: { id: string; title: string; nodes: DiagramNode[] }[];
  className?: string;
}) {
  const paths: PathMap = useMemo(() => {
    const allIds = layers.flatMap((l) => l.nodes.map((n) => n.id));
    const map: PathMap = {};
    for (const id of allIds) {
      map[id] = allIds;
    }
    // tighter: focus highlights same layer + adjacent layers
    for (let i = 0; i < layers.length; i++) {
      const nearby = [
        ...layers[i].nodes.map((n) => n.id),
        ...(layers[i - 1]?.nodes.map((n) => n.id) ?? []),
        ...(layers[i + 1]?.nodes.map((n) => n.id) ?? []),
      ];
      for (const n of layers[i].nodes) {
        map[n.id] = nearby;
      }
    }
    return map;
  }, [layers]);

  const { setFocus, stateFor, lineActive } = usePathState(paths);

  return (
    <Canvas label="Muse architecture map" className={className}>
      <div className="mx-auto flex max-w-2xl flex-col gap-0">
        {layers.map((layer, i) => (
          <div key={layer.id}>
            <div className="rounded-xl bg-white/60 p-4 ring-1 ring-[#eceff3]">
              <SectionLabel>{layer.title}</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <DiagramNodeView
                    key={node.id}
                    node={node}
                    state={stateFor(node.id)}
                    onFocus={setFocus}
                  />
                ))}
              </div>
            </div>
            {i < layers.length - 1 ? (
              <div className="flex justify-center py-1">
                <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden>
                  <path
                    d="M12 0 V20"
                    stroke={stroke(
                      lineActive([
                        layer.nodes[0]?.id,
                        layers[i + 1]?.nodes[0]?.id,
                      ].filter(Boolean) as string[]),
                    )}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 16 L12 22 L16 16"
                    stroke={stroke(
                      lineActive([
                        layer.nodes[0]?.id,
                        layers[i + 1]?.nodes[0]?.id,
                      ].filter(Boolean) as string[]),
                    )}
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Canvas>
  );
}

/* -------------------------------------------------------------------------- */
/* Simple pipeline — use cases / short flows                                  */
/* -------------------------------------------------------------------------- */

export function PipelineDiagram({
  nodes,
  className = "",
}: {
  nodes: DiagramNode[];
  className?: string;
}) {
  const paths: PathMap = useMemo(() => {
    const map: PathMap = {};
    nodes.forEach((n, i) => {
      map[n.id] = nodes.slice(Math.max(0, i - 1), i + 2).map((x) => x.id);
    });
    return map;
  }, [nodes]);

  const { setFocus, stateFor, lineActive } = usePathState(paths);

  return (
    <Canvas label="Workflow pipeline" className={className}>
      <div className="flex flex-col gap-0 md:hidden">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-stretch">
            <DiagramNodeView node={node} state={stateFor(node.id)} onFocus={setFocus} className="w-full" />
            {i < nodes.length - 1 ? (
              <div className="flex justify-center py-1">
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 0 V16" stroke={stroke(lineActive([node.id, nodes[i + 1].id]))} strokeWidth="1.5" />
                  <path d="M8 12 L12 18 L16 12" stroke={stroke(lineActive([node.id, nodes[i + 1].id]))} strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:gap-0">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center">
            <DiagramNodeView node={node} state={stateFor(node.id)} onFocus={setFocus} />
            {i < nodes.length - 1 ? (
              <svg className="mx-1 w-9 shrink-0" height="14" viewBox="0 0 36 14" aria-hidden>
                <path d="M0 7 H28" stroke={stroke(lineActive([node.id, nodes[i + 1].id]))} strokeWidth="1.5" />
                <path d="M24 3 L30 7 L24 11" stroke={stroke(lineActive([node.id, nodes[i + 1].id]))} strokeWidth="1.5" fill="none" />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
    </Canvas>
  );
}

export function ProcessList({
  steps,
  className = "",
}: {
  steps: string[];
  className?: string;
}) {
  return (
    <ol className={`relative ${className}`}>
      {steps.map((step, i) => (
        <li key={step} className="relative flex gap-4 pb-7 last:pb-0">
          {i < steps.length - 1 ? (
            <span className="absolute top-8 bottom-0 left-[15px] w-px bg-[#d5d8de]" aria-hidden />
          ) : null}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e2e5ea] bg-white text-xs font-medium text-signal">
            {i + 1}
          </span>
          <span className="pt-1.5 text-sm text-muted">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function FlowDiagram({
  nodes,
  direction = "horizontal",
  className = "",
}: {
  nodes: { id?: string; label: string; emphasis?: boolean; href?: string }[];
  direction?: "vertical" | "horizontal";
  className?: string;
}) {
  const mapped: DiagramNode[] = nodes.map((n, i) => ({
    id: n.id ?? `flow-${i}`,
    label: n.label,
    href: n.href,
    role: n.emphasis ? "output" : i === 0 ? "secondary" : "tool",
  }));
  void direction;
  return <PipelineDiagram nodes={mapped} className={className} />;
}

export function LayerDiagram({
  layers,
  className = "",
}: {
  layers: { title?: string; nodes: { label: string; emphasis?: boolean; href?: string }[] }[];
  className?: string;
}) {
  return (
    <ArchitectureMap
      className={className}
      layers={layers.map((l, li) => ({
        id: `layer-${li}`,
        title: l.title ?? `Layer ${li + 1}`,
        nodes: l.nodes.map((n, ni) => ({
          id: `l${li}-n${ni}`,
          label: n.label,
          href: n.href,
          role: n.emphasis ? "primary" : "secondary",
        })),
      }))}
    />
  );
}

export function BranchDiagram({
  root,
  branches,
  className = "",
}: {
  root: { label: string; href?: string };
  branches: { title: string; nodes: { label: string; href?: string }[] }[];
  className?: string;
}) {
  return (
    <PlatformMap
      className={className}
      root={{ id: "root", label: root.label, href: root.href, role: "root" }}
      columns={branches.map((b, bi) => ({
        title: b.title,
        nodes: b.nodes.map((n, ni) => ({
          id: `c${bi}-${ni}`,
          label: n.label,
          href: n.href,
          role: "tool" as const,
        })),
      }))}
    />
  );
}
