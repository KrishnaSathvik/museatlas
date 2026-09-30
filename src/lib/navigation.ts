/** Older entry URLs should identify the same section in navigation. */
export function navigationPath(pathname: string): string {
  return pathname
    .replace(/^\/models(?=\/|$)/, "/explore")
    .replace(/^\/projects(?=\/|$)/, "/examples")
    .replace(/^\/security(?=\/|$)/, "/safety");
}

export function isCurrentSection(pathname: string, href: string): boolean {
  const path = navigationPath(pathname);
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}
