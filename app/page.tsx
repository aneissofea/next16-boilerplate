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
            <SectionRenderer sections={page.sections}/>
        </>
    );
}
