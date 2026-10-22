import Link from "next/link";
import Image from "next/image";
import { getNavigation } from "@/lib/navigation";
import MenuDrawer from "@/app/components/ui/drawers/MenuDrawer";

export default function Header() {
    const nav = getNavigation();

    return (
        <div className="sticky top-0 z-50 w-full bg-white">
            <div className="container py-2 md:py-4 flex items-center justify-between">
                <Link href="/">
                    <Image src="/next.svg" alt="Next.js logo" className=""
                        width={80} height={40} priority/>
                </Link>
                <div className="hidden md:flex flex-row gap-10 justify-between">
                    {nav.main_navigations.map((link, index) => (
                        <Link href={link.url} target={link.target} rel="noopener noreferrer" key={index}
                           className="uppercase font-semibold! text-small w-fit">
                            {link.label}
                        </Link>
                    ))}
                </div>
                <MenuDrawer>
                    <div className="flex flex-col gap-6">
                        {nav.main_navigations.map((link, index) => (
                            <Link href={link.url} target={link.target} rel="noopener noreferrer" key={index}
                               className="uppercase font-semibold! text-small w-fit">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </MenuDrawer>
            </div>
        </div>
    )
}