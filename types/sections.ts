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

// Sections
export type HomeBannerSection = {
    type: "home-banner";
    bg_image: PartialImage;
};

export type ClauseSection = {
    type: "clause";
    title: string;
    items: PartialTexts[];
};

// Add new section types to this union, then add a case in SectionRenderer
export type PageSection = ClauseSection | HomeBannerSection;
