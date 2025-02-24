import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const SendVerification = ({ user }) => {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(user.email);
    // const send_verification = useCallback(async () => {
    //     if (!email) return;
    //
    //     setLoading(true);
    //     try {
    //         const result = await sendVerification(email);
    //         if (result.success) {
    //             setMessage({
    //                 type: "success",
    //                 message: "Successful! Please check your inbox.",
    //             });
    //         } else {
    //             setMessage({ type: "error", message: result.message });
    //             console.log(result.message);
    //         }
    //     } catch (error) {
    //         setMessage({ type: "error", message: "An error occurred." });
    //         console.error(error);
    //     }
    //     setLoading(false);
    // }, [email]);
    return (_jsx("div", { className: "background", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "envelope", children: _jsx("svg", { viewBox: "0 0 24 24", className: "SVG", children: _jsx("path", { d: "M20.8 4H3.2C2.54 4 2 4.54 2 5.2V18.8C2 19.46 2.54 20 3.2 20H20.8C21.46 20 22 19.46 22 18.8V5.2C22 4.54 21.46 4 20.8 4ZM20.8 7.33L12 12.53L3.2 7.33V5.2L12 10.4L20.8 5.2V7.33Z", fill: "#007BFF" }) }) }), _jsx("h2", { className: "bold", children: "Confirm Your Email" }), _jsx("p", { className: "thankyou", children: _jsx("b", { children: "Thank you for signing up with Twitter." }) }), _jsxs("div", { className: "body", children: ["A confirmation email has been sent to ", _jsx("br", {}), _jsx("b", { children: email })] }), _jsx("div", { className: "body", children: "Please check your inbox and click the link to complete your registration. If you haven't received the email, check your spam folder." }), message && (_jsxs("div", { className: `messageBox ${message.type}`, children: [message.message, _jsx("button", { onClick: () => setMessage(null), className: "removeBox", children: _jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", className: "R_SVG", children: _jsx("g", { children: _jsx("path", { d: "M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" }) }) }) })] })), _jsx("button", { className: "sendButton", 
                    // onClick={send_verification}
                    disabled: loading, children: loading ? "Please wait..." : "Resend Verification" })] }) }));
};
export default SendVerification;
