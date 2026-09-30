import { PageSchema } from "@/components/seo/PageSchema";
import type { Metadata } from "next";
import { UseCasesPage } from "@/components/explore/UseCasesPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/use-cases");

export default function Page() {
  return <><PageSchema path="/use-cases"/><UseCasesPage/></>;
}
