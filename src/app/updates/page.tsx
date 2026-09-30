import { PageSchema } from "@/components/seo/PageSchema";
import type { Metadata } from "next";
import { UpdatesPage } from "@/components/explore/UpdatesPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/updates");

export default function Page() {
  return <><PageSchema path="/updates"/><UpdatesPage/></>;
}
