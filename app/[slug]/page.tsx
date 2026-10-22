import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPages, getPage } from "@/lib/pages";
import { composeSeoMeta } from "@/lib/seo";
import SectionRenderer from "@/app/components/SectionRenderer";

// One page per JSON file in content/pages/ (like Nuxt's prerender routes)
export async function generateStaticParams() {
    return getAllPages().map((page) => ({ slug: page.slug }));
}

// <head> tags for this page (like useSeoMeta)
export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
    const { slug } = await params;
    const page = getPage(slug);
    if (!page) return {};

    return composeSeoMeta(page);
}

export default async function Page({ params }: PageProps<"/[slug]">) {
    const { slug } = await params;
    const page = getPage(slug);

    if (!page) notFound(); // like throw createError({ statusCode: 404 })

    return (
        <>
            <h1 className="sr-only">{page.title}</h1>
            <SectionRenderer sections={page.sections}/>
        </>
    );
}
