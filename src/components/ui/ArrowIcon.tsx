type Props = { direction?: "right" | "left" | "external" };

export function ArrowIcon({ direction = "right" }: Props) {
  return <span className="ui-arrow" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d={direction === "external" ? "M7 17 17 7M7 7h10v10" : direction === "left" ? "M19 12H5m6 6-6-6 6-6" : "M5 12h14m-6-6 6 6-6 6"}/>
    </svg>
  </span>;
}
