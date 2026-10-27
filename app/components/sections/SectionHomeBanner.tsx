import type {HomeBannerSection} from "@/types/sections";
import SwiperWrapper from "@/app/components/ui/sliders/SwiperWrapper";
import Description from "@/app/components/ui/typography/Description";
import {Buttons} from "@/app/components/ui/buttons/Buttons";

type BannerItem = HomeBannerSection["items"][number];

function BannerSlide({ item }: { item: BannerItem }) {
    return (
        <div className="relative h-[calc(100vh)] w-full overflow-hidden text-white">
            {item.bg_image?.url && <img src={item.bg_image.url} alt={item.bg_image.alternativeText}
                 className="absolute inset-0 h-full w-full object-cover object-center "/>}
            <div className="absolute inset-0 bg-black/35"/>

            <div className="container pt-8 pb-4 flex items-center z-10 h-full relative">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        {item.title && <h2 className="text-heading-2">{item.title}</h2>}
                        {item.description && <Description text={item.description}/>}
                    </div>
                    {item.buttons?.length>0 && <Buttons buttons={item.buttons}/>}
                </div>
            </div>
        </div>
    )
}

export default function SectionHomeBanner({ section }: { section: HomeBannerSection }) {
    return (
        <SwiperWrapper
            breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 0 } }}
            navClassName="absolute! inset-x-0 bottom-8 z-20 text-white"
            // Static first slide in the prerendered HTML: no blank hero or layout shift before Swiper mounts
            fallback={section.items[0] && <BannerSlide item={section.items[0]}/>}
        >
            {section.items.map((item, i) => (
                <BannerSlide key={i} item={item}/>
            ))}
        </SwiperWrapper>
    )
}
