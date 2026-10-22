import {Button} from "primereact/button";

export default function ButtonSecondary({ children }: { children: React.ReactNode }){
    return (
        <Button className="py-2 px-6 bg-transparent border border-white uppercase font-semibold text-small">
            {children}
        </Button>
    )
}
