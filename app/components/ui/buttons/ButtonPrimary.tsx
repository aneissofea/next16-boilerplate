import {Button} from "primereact/button";

export default function ButtonPrimary({ children }: { children: React.ReactNode }){
    return (
        <Button className="py-2 px-6 text-white bg-primary uppercase font-semibold text-small">
            {children}
        </Button>
    )
}
