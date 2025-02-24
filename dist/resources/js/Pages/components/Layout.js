import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head, usePage } from "@inertiajs/react";
import Header from "./Header";
import { StoreProvider } from "../store/StoreContext";
export default function Layout({ title, description, time, children, }) {
    const { url, component, props } = usePage();
    return (_jsxs(StoreProvider, { children: [_jsxs(Head, { children: [_jsx("title", { children: title }), _jsx("meta", { name: "description", content: description })] }), _jsx(Header, {}), children] }));
}
