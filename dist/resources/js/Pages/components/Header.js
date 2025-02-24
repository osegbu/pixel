import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../css/header.css";
import { usePage } from "@inertiajs/react";
import CreateTask from "./CreateTask";
import { useEffect, useState } from "react";
import { useStore } from "../store/StoreContext";
export default function Header() {
    const [active, setActive] = useState(false);
    const { props } = usePage();
    const { closeModals } = useStore();
    const closeModal = () => {
        setActive(false);
    };
    useEffect(() => {
        if (active && Object.keys(props.errors).length === 0) {
            closeModal();
        }
    }, [props.errors]);
    return (_jsxs("div", { className: "headerContainer", children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "logo", children: "PIXEL" }), _jsx("div", { className: "headerRight", children: _jsx("button", { className: "createTaskBtn", onClick: () => {
                                closeModals();
                                setActive(!active);
                            }, children: "Create Task" }) })] }), active && _jsx(CreateTask, { closeModal: closeModal })] }));
}
