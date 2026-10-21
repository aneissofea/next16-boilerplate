import fs from "node:fs";
import path from "node:path";
import type { SeoSettings } from "@/lib/seo";
import type { PageSection } from "@/types/sections";

// Shape of content/home.json and each file in content/pages/*.json
export type Page = {
    title: string;
    slug: string;
    seo_settings?: SeoSettings;
    og_image?: string;
    sections: PageSection[];
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");

// Synchronous reads keep this prerenderable under Cache Components.
function readPage(file: string): Page {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as Page;
}

export function getHomePage(): Page {
    return readPage(path.join(CONTENT_DIR, "home.json"));
}

export function getAllPages(): Page[] {
    return fs
        .readdirSync(PAGES_DIR)
        .filter((file) => file.endsWith(".json"))
        .map((file) => readPage(path.join(PAGES_DIR, file)));
}

export function getPage(slug: string): Page | undefined {
    return getAllPages().find((page) => page.slug === slug);
}
