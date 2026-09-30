import Image from "next/image";
import type { MuseProject } from "@/data/projects";
import { exampleMedia } from "@/data/example-media";

export function ExampleScreenshot({ project, priority = false }: { project: MuseProject; priority?: boolean }) {
  const media = exampleMedia[project.slug];
  if (!media) return null;
  return <figure className="example-screenshot">
    <div className="screenshot-frame"><Image src={media.src}
      alt={`${project.title} screenshot`} fill preload={priority}
      sizes="(max-width: 760px) 94vw, 48vw" /></div>
    <figcaption>{project.title}</figcaption>
  </figure>;
}
