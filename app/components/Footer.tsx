import navigation from "@/content/constant/navigation.json";

export default function Footer() {
    return (
        <div className="container py-2 flex flex-wrap gap-2 items-center justify-between text-xs md:text-small">
            <div>
                {/*© { new Date().getFullYear() }. All rights reserved.*/}
                © 2026. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-4">
                {navigation.footer_links.map((link, i) => (
                    <a href={link.url} target={link.target} rel="noopener noreferrer" key={i} className="">
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    )
}