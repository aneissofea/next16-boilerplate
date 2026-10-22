"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type MenuDrawerProps = {
    // Whatever goes inside the drawer panel (React's version of Vue's <slot/>)
    children: ReactNode;
    className?: string;
};

// Mobile-only menu: hamburger button + drawer sliding in from the right.
// Closes on backdrop click, Escape, link click, or route change.
export default function MenuDrawer({ children, className = "" }: MenuDrawerProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close after navigating (adjusting state during render, no effect needed)
    const [lastPathname, setLastPathname] = useState(pathname);
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setOpen(false);
    }

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden"; // block page scroll behind the drawer
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [open]);

    // Clicking any link inside the drawer closes it (covers same-page links too)
    const onPanelClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a")) setOpen(false);
    };

    return (
        <div className={`md:hidden ${className}`}>
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu"
                    aria-expanded={open} aria-controls="menu-drawer"
                    className="size-10 flex items-center justify-center cursor-pointer">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
                </svg>
            </button>

            <div onClick={() => setOpen(false)} aria-hidden
                 className={`fixed inset-0 z-60 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}/>

            <div id="menu-drawer" role="dialog" aria-modal="true" aria-label="Menu" inert={!open}
                 onClick={onPanelClick}
                 className={`fixed top-0 right-0 z-70 h-dvh w-full max-w-sm bg-white shadow-xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-end p-4">
                    <button type="button" onClick={() => setOpen(false)} aria-label="Close menu"
                            className="size-10 flex items-center justify-center cursor-pointer">
                        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
