import Image from "next/image";

/** Editorial concepts, never claimed to be screenshots or Muse-generated output. */
export function Illustration({ id, alt, priority = false, className = "" }: {
  id: string; alt: string; priority?: boolean; className?: string;
}) {
  return <div className={`editorial-art ${className}`}>
    <Image src={`/illustrations/${id}.png`} alt={alt} width={1440} height={1080}
      sizes="(max-width: 760px) 94vw, 48vw" preload={priority} />
  </div>;
}
