import { PageSchema } from "@/components/seo/PageSchema";
import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/explore/HowItWorksPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/how-it-works");

export default function Page() {
  return <><PageSchema path="/how-it-works"/><HowItWorksPage/></>;
}
