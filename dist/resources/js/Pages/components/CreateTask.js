import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../css/createtask.css";
import { useForm } from "@inertiajs/react";
export default function CreateTask({ closeModal }) {
    const { data, setData, post, processing, errors } = useForm({
        task: "",
        due_date: "",
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        post("/create");
    };
    return (_jsx("div", { className: "createTaskCon", onClick: () => closeModal(), children: _jsxs("div", { className: "createCon", onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "createTaskTitle", children: "Create Task" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("fieldset", { children: [_jsx("legend", { children: "Task: " }), _jsx("input", { type: "text", id: "task", name: "task", value: data.task, placeholder: "Task", onInput: handleInput })] }), !processing && errors.task && (_jsx("div", { className: "error", children: errors.task })), _jsxs("fieldset", { children: [_jsx("legend", { children: "Due Date:" }), _jsx("input", { type: "date", id: "due_date", name: "due_date", value: data.due_date, placeholder: "Due Date", onInput: handleInput })] }), !processing && errors.due_date && (_jsx("div", { className: "error", children: errors.due_date })), _jsx("button", { type: "submit", className: "submitBtn", disabled: processing, children: "Submit" })] })] }) }));
}
