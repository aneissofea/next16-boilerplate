import ButtonPrimary from "@/app/components/ui/buttons/ButtonPrimary";
import ButtonSecondary from "@/app/components/ui/buttons/ButtonSecondary";

type ButtonItem = {
    label: string;
    url: string;
    target: string;
    style: string;
}

export function Buttons({buttons}: { buttons: ButtonItem[] }) {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            {buttons.map((button, index) => (
                <a href={button.url} target={button.target} rel="noopener noreferrer" key={index}
                   className="uppercase font-semibold! text-xs xs:text-small w-fit">
                    {button.style === 'Primary' && <ButtonPrimary>{button.label}</ButtonPrimary>}
                    {button.style === 'Secondary' && <ButtonSecondary>{button.label}</ButtonSecondary>}
                </a>
            ))}
        </div>
    );
}