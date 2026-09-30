import Image from "next/image";
export function DiagramImage({ id, alt, caption }: { id: string; alt: string; caption?: string }) {
  return <figure className="generated-diagram">
    <Image src={`/diagrams/${id}.png`} alt={alt} width={1536} height={1024}
      sizes="94vw" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
