"use client";

import { useEffect, useState } from "react";

// [time in ms, percent]. Flat segments are the pauses at 44% and 88%.
const TIMELINE: [number, number][] = [
    [0, 0],
    [1400, 44],
    [1900, 44],
    [3100, 70],
    [3800, 70],
    [4400, 100],
];

const DURATION = TIMELINE[TIMELINE.length - 1][0];

// Ease out so the count slows down as it reaches each pause.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function percentAt(time: number) {
    for (let i = 1; i < TIMELINE.length; i++) {
        const [t0, p0] = TIMELINE[i - 1];
        const [t1, p1] = TIMELINE[i];
        if (time <= t1) return p0 + (p1 - p0) * easeOut((time - t0) / (t1 - t0));
    }
    return 100;
}

const logoMask = {
    maskImage: "url(/next.svg)",
    WebkitMaskImage: "url(/next.svg)",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
};

export default function LoadingScreen() {
    const [percent, setPercent] = useState(0);
    const [done, setDone] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let frame: number;
        let start: number | undefined;

        const tick = (now: number) => {
            start ??= now;
            const elapsed = now - start;
            setPercent(percentAt(elapsed));

            if (elapsed < DURATION) frame = requestAnimationFrame(tick);
            else setTimeout(() => setDone(true), 300);
        };

        document.documentElement.style.overflow = "hidden";
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            document.documentElement.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (done) document.documentElement.style.overflow = "";
    }, [done]);

    if (hidden) return null;

    const rounded = Math.round(percent);

    return (
        <div
            role="status"
            aria-label={`Loading ${rounded}%`}
            onTransitionEnd={() => done && setHidden(true)}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black text-white transition-opacity duration-700 ease-out-expo ${done ? "pointer-events-none opacity-0" : ""}`}
        >
            <div className="relative size-28 md:size-36" style={logoMask}>
                {/* Faint outline so the empty logo still reads */}
                <div className="absolute inset-0 bg-white/10" />

                {/* The water */}
                <div className="absolute inset-x-0 bottom-0 bg-white" style={{ height: `${percent}%` }}>
                    {rounded > 0 && rounded < 100 && (
                        <svg
                            viewBox="0 0 200 10"
                            preserveAspectRatio="none"
                            className="absolute bottom-full left-0 h-2 w-[200%] fill-white animate-wave motion-reduce:animate-none"
                            aria-hidden
                        >
                            <path d="M0 5 Q 25 0 50 5 T 100 5 T 150 5 T 200 5 V 10 H 0 Z" />
                        </svg>
                    )}
                </div>
            </div>

            <p className="text-[20px] tabular-nums" aria-hidden>
                {rounded}%
            </p>
        </div>
    );
}
