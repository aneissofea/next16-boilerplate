"use client";

import { Children, Suspense, useId, useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance, SwiperOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import ButtonChevron from "@/app/components/ui/buttons/ButtonChevron";

type SwiperWrapperProps = {
    // Each child becomes one slide (React's version of Vue's scoped <slot>).
    // Using children instead of a render function lets Server Components pass slides in.
    children: ReactNode;
    breakpoints?: SwiperOptions["breakpoints"];
    autoplay?: SwiperOptions["autoplay"];
    loop?: boolean;
    className?: string;
    navClassName?: string;
    // Shown in the prerendered HTML until Swiper renders on request (see Suspense below)
    fallback?: ReactNode;
};

const defaultBreakpoints: SwiperOptions["breakpoints"] = {
    0: { slidesPerView: 1, spaceBetween: 8 },
    640: { slidesPerView: 2, spaceBetween: 8 },
    768: { slidesPerView: 3, spaceBetween: 24 },
    1024: { slidesPerView: 4, spaceBetween: 30 },
};

export default function SwiperWrapper({
    children,
    breakpoints = defaultBreakpoints,
    autoplay = { delay: 5000, disableOnInteraction: false },
    loop = false,
    className = "",
    navClassName = "",
    fallback = null,
}: SwiperWrapperProps) {
    const slides = Children.toArray(children);

    // Unique class so several sliders on one page don't share a pagination element
    const paginationClass = `custom-swiper-pagination-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    // Swiper "locks" itself when every slide already fits, so there is nothing to navigate.
    // Replaces the Vue version's useWindowSize + slidesPerView check.
    const [isLocked, setIsLocked] = useState(true);

    const syncState = (s: SwiperInstance) => {
        setIsBeginning(s.isBeginning);
        setIsEnd(s.isEnd);
        setIsLocked(s.isLocked);
    };

    return (
        <div className={`relative flex flex-col gap-6 ${className}`}>
            {/* Swiper reads Date.now() while rendering, which Cache Components can't prerender.
                Suspense keeps it out of the static shell so it renders per request instead. */}
            <Suspense fallback={fallback}>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={loop}
                    autoplay={autoplay}
                    breakpoints={breakpoints}
                    pagination={{ el: `.${paginationClass}`, clickable: true, type: "bullets" }}
                    onSwiper={(s) => { setSwiper(s); syncState(s); }}
                    onSlideChange={syncState}
                    onLock={syncState}
                    onUnlock={syncState}
                    onBreakpoint={syncState}
                    // Equal-height slides: let flexbox stretch every slide to the tallest one
                    className="w-full [&_.swiper-slide]:h-auto"
                >
                    {slides.map((slide, i) => (
                        <SwiperSlide key={i} className="flex">{slide}</SwiperSlide>
                    ))}
                </Swiper>
            </Suspense>

            {/* Always rendered so Swiper can find the pagination element on init; hidden when locked */}
            <div className={`flex flex-col gap-4 justify-center items-center mx-auto ${isLocked ? "hidden" : ""} ${navClassName}`}>
                {/* Swiper adds .swiper-pagination (position:absolute, width:100%); reset it to flow normally */}
                <div className={`${paginationClass} static! w-auto! flex justify-center gap-1`}/>
                <div className="flex justify-center gap-4">
                    <ButtonChevron direction="left" onClick={() => swiper?.slidePrev()} disabled={!loop && isBeginning}/>
                    <ButtonChevron direction="right" onClick={() => swiper?.slideNext()} disabled={!loop && isEnd}/>
                </div>
            </div>
        </div>
    );
}
