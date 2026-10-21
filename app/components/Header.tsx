import Link from "next/link";
import Image from "next/image";
import { getNavigation } from "@/lib/navigation";

export default function Header() {
    const nav = getNavigation();

    return (
        <div className="fixed top-0 z-50 w-full bg-white">
            <div className="container py-4 flex justify-between">
                <Link href="/">
                    <Image src="/next.svg" alt="Next.js logo" className=""
                        width={80} height={40} priority/>
                </Link>
                <div className="flex flex-row gap-4 md:gap-10 justify-between">
                    {nav.main_navigations.map((link, index) => (
                        <Link href={link.url} target={link.target} rel="noopener noreferrer" key={index}
                           className="uppercase font-semibold! text-xs xs:text-small w-fit">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}