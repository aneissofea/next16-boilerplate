import type { Metadata } from "next";

// Like Nuxt's runtimeConfig.public.siteName; set NEXT_PUBLIC_SITE_NAME in .env to override.
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Lewis Hamilton";

export type SeoSettings = {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
};

type ComposeSeoMetaInput = {
    title: string;
    seo_settings?: SeoSettings;
    og_image?: string;
    image?: { url?: string };
};

export function composeSeoMeta({ title, seo_settings = {}, og_image, image }: ComposeSeoMetaInput): Metadata {
    const metaTitle = seo_settings.metaTitle || `${title} | ${siteName}`;
    const metaDescription = seo_settings.metaDescription || seo_settings.metaTitle || title;
    const ogImage = og_image || image?.url;

    // Next.js leaves out undefined fields, so empty values don't need stripping.
    return {
        title: metaTitle,
        description: metaDescription,
        keywords: seo_settings.metaKeywords || undefined,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            siteName,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}
