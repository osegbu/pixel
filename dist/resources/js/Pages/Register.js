import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useForm } from "@inertiajs/react";
import "./css/login.css";
export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };
    return (_jsxs("div", { className: "loginCon", children: [_jsx("div", { className: "appName", children: _jsx("b", { children: "PIXEL" }) }), _jsxs("div", { className: "formCover", children: [_jsx("div", { style: { textAlign: "center" }, children: "Create account" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("fieldset", { children: [_jsx("legend", { children: "Email: " }), _jsx("input", { type: "email", name: "email", value: data.email, placeholder: "E-mail", onInput: handleInput })] }), !processing && errors.email && (_jsx("div", { className: "error", children: errors.email })), _jsxs("fieldset", { children: [_jsx("legend", { children: "Password: " }), _jsx("input", { type: "password", name: "password", value: data.password, placeholder: "Password", onInput: handleInput })] }), !processing && errors.password && (_jsx("div", { className: "error", children: errors.password })), _jsxs("fieldset", { children: [_jsx("legend", { children: "Confirm Password: " }), _jsx("input", { type: "password", name: "password_confirmation", value: data.password_confirmation, placeholder: "Confirm Password", onInput: handleInput })] }), _jsx("div", { children: _jsx("button", { type: "submit", className: "submitBtn", disabled: processing, children: "Submit" }) }), _jsxs("div", { className: "formLink", children: ["Already have an account ?", " ", _jsx(Link, { href: "/login", children: "Login" })] })] })] })] }));
}
