import type { Metadata } from "next";
import { getHomePage } from "@/lib/pages";
import { composeSeoMeta } from "@/lib/seo";
import SectionRenderer from "@/app/components/SectionRenderer";
import LoadingScreen from "@/app/components/LoadingScreen";

export const metadata: Metadata = composeSeoMeta(getHomePage());

export default function Home() {
    const page = getHomePage();

    return (
        <>
            <LoadingScreen/>
            <h1 className="sr-only">{page.title}</h1>
            <SectionRenderer sections={page.sections}/>
        </>
    );
}
