import type { PageSection } from '@/types/sections';
import SectionClause from '@/app/components/sections/SectionClause';
import SectionHomeBanner from '@/app/components/sections/SectionHomeBanner';

// Renders a page's sections in order (like Nuxt's <component :is>).
// New section: add its type to PageSection, then add a case here.
export default function SectionRenderer({ sections }: { sections: PageSection[] }) {
    return sections.map((section, i) => {
        switch (section.type) {
            case 'home-banner':
                return <SectionHomeBanner key={i} section={section}/>;
            default:
                // Type error here = a PageSection type is missing its case above
                // At runtime, unknown types from the CMS are skipped instead of crashing
                void (section satisfies never);
                return null;
        }
    });
}
