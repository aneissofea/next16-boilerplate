import type { ClauseSection } from "@/types/sections";
import Description from "@/app/components/ui/typography/Description";

export default function SectionClause({ section }: { section: ClauseSection }) {
    return (
        <section className="container flex flex-col">
            <div className="py-16 flex flex-col gap-12 w-full max-w-5xl mx-auto">
                {section.title && <h2 className="text-heading-2 font-extrabold! italic text-primary">{section.title}</h2>}

                <div className="flex flex-col gap-10">
                    {section.items.map((item, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            {item.title && <h3 className="text-heading-4 text-primary italic">{item.title}</h3>}
                            {item.description && <Description text={item.description}/>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
