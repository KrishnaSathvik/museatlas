import { PageSchema } from "@/components/seo/PageSchema";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { pageMetadata } from "@/lib/site";
export const metadata=pageMetadata("/examples");
export default function Page(){return <><PageSchema path="/examples"/><ProjectsExplorer/></>;}
