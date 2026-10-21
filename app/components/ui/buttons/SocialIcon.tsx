import { FaFacebook, FaInstagram, FaLinkedin, FaThreads, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

// Keys match the "icon" field in content/navigation.json
const icons = {
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    tiktok: FaTiktok,
    x: FaXTwitter,
    facebook: FaFacebook,
    youtube: FaYoutube,
    threads: FaThreads,
};

export default function SocialIcon({ name, className }: { name: string; className?: string }) {
    const Icon = icons[name as keyof typeof icons];
    return Icon ? <Icon className={className} aria-hidden /> : null;
}
