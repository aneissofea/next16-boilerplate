// Shapes of the blocks inside a page's `sections` array.
// Each section has a unique `type`, which SectionRenderer switches on.

// Partials: small reusable shapes shared by several sections
export type PartialTexts = {
    title: string | null;
    description: string; // HTML
};

export type PartialImage = {
    url: string;
    alternativeText: string;
};

export type PartialButton= {
    label: string;
    url: string;
    target: string;
    style: string;
};

// Sections
export type HomeBannerItem = {
    title: string | null;
    description: string;
    buttons: PartialButton[];
    bg_image: PartialImage;
};

export type HomeBannerSection = {
    type: "home-banner";
    items: HomeBannerItem[];
};

export type ClauseSection = {
    type: "clause";
    title: string;
    items: PartialTexts[];
};

// Add new section types to this union, then add a case in SectionRenderer
export type PageSection = ClauseSection | HomeBannerSection;
