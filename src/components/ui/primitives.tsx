import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-wide ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
  wash = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  wash?: boolean;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${wash ? "bg-wash" : "bg-paper"} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[0.7rem] font-medium tracking-[0.14em] text-subtle uppercase">
      {children}
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[0.9375rem] font-medium no-underline transition duration-150";
  const styles =
    variant === "primary"
      ? "bg-signal text-white hover:brightness-110"
      : variant === "secondary"
        ? "border border-rule-strong bg-paper text-ink hover:border-signal hover:text-signal"
        : "text-muted hover:text-ink";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
