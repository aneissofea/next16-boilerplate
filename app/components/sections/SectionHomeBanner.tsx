import Image from "next/image";
import type {HomeBannerSection} from "@/types/sections";
import Description from "@/app/components/ui/typography/Description";
import {Buttons} from "@/app/components/ui/buttons/Buttons";

export default function SectionHomeBanner({ section }: { section: HomeBannerSection }) {
    return (
        <div className="relative h-[calc(100vh)] w-full overflow-hidden text-white">
            <img src={section.bg_image?.url} alt={section.bg_image?.alternativeText}
                 className="absolute inset-0 h-full w-full object-cover object-center "/>
            <div className="absolute inset-0 bg-black/35"/>

            <div className="container pt-8 pb-4 flex items-center z-10 h-full relative">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-heading-2">{section.title}</h2>
                        {section.description && <Description text={section.description}/>}
                    </div>
                    {section.buttons?.length>0 && <Buttons buttons={section.buttons}/>}
                </div>
            </div>
        </div>
    )
}