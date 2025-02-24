import { Head, Link, usePage } from "@inertiajs/react";
import Header from "./Header";
import { StoreProvider } from "../store/StoreContext";

interface LayoutProps {
    title: string;
    description: string;
    time?: string;
    children: React.ReactNode;
}

export default function Layout({
    title,
    description,
    time,
    children,
}: LayoutProps) {
    const { url, component, props } = usePage();

    return (
        <StoreProvider>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <Header />
            {children}
        </StoreProvider>
    );
}
