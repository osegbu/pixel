import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../css/taskcomponent.css";
import { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { usePage } from "@inertiajs/react";
import { useStore } from "../store/StoreContext";
export default function Task({ task }) {
    const { state, openEditModal } = useStore();
    const [openEdit, setOpenEdit] = useState(false);
    const { props } = usePage();
    useEffect(() => {
        if (openEdit && Object.keys(props.errors).length === 0) {
            setOpenEdit(false);
        }
    }, [props.errors]);
    return (_jsxs("div", { className: "taskMainCon", children: [_jsxs("div", { className: "taskContainer", onClick: () => task.id && openEditModal(task.id), children: [_jsx("div", { className: "task", children: _jsx("div", { children: task.task }) }), _jsx("div", { className: "taskDate", children: _jsx("span", { children: _jsx("div", { children: task.due_date }) }) }), _jsx("div", { className: "taskStatus", children: _jsx("span", { className: task.status.toLowerCase(), children: _jsx("div", { children: task.status }) }) })] }), state.openEditModal === task.id && _jsx(EditTask, { task: task })] }));
}
