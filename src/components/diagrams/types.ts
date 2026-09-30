export type NodeRole = "root" | "primary" | "secondary" | "tool" | "output";

export type DiagramNode = {
  id: string;
  label: string;
  href?: string;
  role?: NodeRole;
};
