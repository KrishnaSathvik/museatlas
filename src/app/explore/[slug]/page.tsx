import { notFound } from "next/navigation";
import { models } from "@/data/models";
import { additionalProducts } from "@/data/products";
import { ModelDetail } from "@/components/models/ModelDetail";
import { pageMetadata } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
const products = [...models, ...additionalProducts];
export function generateStaticParams() { return products.map(p=>({slug:p.slug})); }
export async function generateMetadata({params}:Props) { const {slug}=await params; const p=products.find(p=>p.slug===slug); if (!p) notFound(); return pageMetadata(`/explore/${slug}`); }
export default async function ProductPage({params}:Props) { const {slug}=await params; const product=products.find(p=>p.slug===slug); if(!product)notFound(); return <ModelDetail model={product}/>; }
