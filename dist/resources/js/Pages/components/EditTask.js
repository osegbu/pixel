import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../css/createtask.css";
import { Link, useForm } from "@inertiajs/react";
import { useStore } from "../store/StoreContext";
export default function EditTask({ task }) {
    const { openEditModal } = useStore();
    const { data, setData, patch, processing, errors } = useForm({
        task: task.task,
        due_date: task.due_date,
        status: task.status,
    });
    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setData(name, checked ? "completed" : "pending");
        }
        else {
            setData(name, value);
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        patch(`/edit/${task.id}`);
    };
    return (_jsx("div", { className: "createTaskCon", onClick: () => openEditModal(task.id), children: _jsxs("div", { className: "createCon", onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "createTaskTitle", children: "Edit Task" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("fieldset", { children: [_jsx("legend", { children: "Task: " }), _jsx("input", { type: "text", name: "task", value: data.task, placeholder: "Task", onInput: handleInput })] }), !processing && errors.task && (_jsx("div", { className: "error", children: errors.task })), _jsxs("fieldset", { children: [_jsx("legend", { children: "Due Date:" }), _jsx("input", { type: "date", name: "due_date", value: data.due_date, placeholder: "Due Date", onInput: handleInput })] }), !processing && errors.due_date && (_jsx("div", { className: "error", children: errors.due_date })), _jsxs("fieldset", { children: [_jsx("legend", { children: "Status:" }), _jsxs("label", { children: [_jsx("div", { children: "Completed" }), _jsx("input", { type: "checkbox", name: "status", checked: data.status.toLocaleLowerCase() ===
                                                "completed", onChange: handleInput })] })] }), _jsxs("div", { className: "formBottom", children: [_jsx("button", { type: "submit", className: "submitBtn", disabled: processing, children: "Submit" }), _jsx(Link, { href: `/delete/${task.id}`, method: "delete", as: "button", className: "deleteBtn", children: _jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", className: "SVG", children: _jsx("g", { children: _jsx("path", { d: "M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z" }) }) }) })] })] })] }) }));
}
