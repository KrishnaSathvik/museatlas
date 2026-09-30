import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { PageIntro } from "@/components/guide/Visuals";

export default function NotFound() {
  return <main id="main" className="guide container-wide">
    <PageIntro title="This page isn’t here.">The address may have changed. Start with the overview or explore the Muse family.</PageIntro>
    <div className="actions"><Link className="primary-link" href="/">Back to Overview</Link><Link className="text-link" href="/explore">Explore Muse <ArrowIcon/></Link></div>
  </main>;
}
