import fs from "node:fs";
import path from "node:path";

// Shape of content/constant/navigations.json
export type NavLink = {
    label: string;
    url: string;
    target?: string;
};

export type SocialLink = {
    label: string;
    url: string;
    icon: string; // key in SocialIcon's icon map
    iconClass?: string; // Font Awesome class, for when icons come from the CMS as classes
};

export type Navigation = {
    social_medias: SocialLink[];
    main_navigations: NavLink[];
    footer_links: NavLink[];
};

const NAVIGATION_FILE = path.join(process.cwd(), "content/constant/navigation.json");

// Synchronous read keeps this prerenderable under Cache Components.
export function getNavigation(): Navigation {
    return JSON.parse(fs.readFileSync(NAVIGATION_FILE, "utf-8")) as Navigation;
}
