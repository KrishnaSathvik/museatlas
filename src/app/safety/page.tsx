import { PageSchema } from "@/components/seo/PageSchema";
import { SecurityPage } from "@/components/explore/SecurityPage";
import { pageMetadata } from "@/lib/site";
export const metadata=pageMetadata("/safety");
export default function Page(){return <><PageSchema path="/safety"/><SecurityPage/></>;}
