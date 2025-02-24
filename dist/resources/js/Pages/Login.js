import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useForm } from "@inertiajs/react";
import "./css/login.css";
export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };
    return (_jsxs("div", { className: "loginCon", children: [_jsx("div", { className: "appName", children: _jsx("b", { children: "PIXEL" }) }), _jsxs("div", { className: "formCover", children: [_jsx("div", { style: { textAlign: "center" }, children: "Login to your account" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("fieldset", { children: [_jsx("legend", { children: "Email: " }), _jsx("input", { type: "email", name: "email", value: data.email, placeholder: "E-mail", onInput: handleInput })] }), _jsxs("fieldset", { children: [_jsx("legend", { children: "Password: " }), _jsx("input", { type: "password", name: "password", value: data.password, placeholder: "Password", onInput: handleInput })] }), !processing && errors.password && (_jsx("div", { className: "error", children: errors.password })), _jsx("div", { children: _jsx("button", { type: "submit", className: "submitBtn", disabled: processing, children: "Submit" }) }), _jsxs("div", { className: "formLink", children: ["Don't have an account ?", " ", _jsx(Link, { href: "/register", children: "Create an account" })] })] })] })] }));
}
