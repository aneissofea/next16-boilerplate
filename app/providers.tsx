"use client";
import { PrimeReactProvider } from "@primereact/core/config";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
