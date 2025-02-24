import { useCallback, useEffect, useState } from "react";

interface AuthUser {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
    };
}

interface Message {
    type: "success" | "error";
    message: string;
}

const SendVerification = ({ user }: AuthUser) => {
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(user.email);

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

    return (
        <div className="background">
            <div className="container">
                <div className="envelope">
                    <svg viewBox="0 0 24 24" className="SVG">
                        <path
                            d="M20.8 4H3.2C2.54 4 2 4.54 2 5.2V18.8C2 19.46 2.54 20 3.2 20H20.8C21.46 20 22 19.46 22 18.8V5.2C22 4.54 21.46 4 20.8 4ZM20.8 7.33L12 12.53L3.2 7.33V5.2L12 10.4L20.8 5.2V7.33Z"
                            fill="#007BFF"
                        />
                    </svg>
                </div>
                <h2 className="bold">Confirm Your Email</h2>
                <p className="thankyou">
                    <b>Thank you for signing up with Twitter.</b>
                </p>
                <div className="body">
                    A confirmation email has been sent to <br />
                    <b>{email}</b>
                </div>
                <div className="body">
                    Please check your inbox and click the link to complete your
                    registration. If you haven't received the email, check your spam
                    folder.
                </div>

                {message && (
                    <div className={`messageBox ${message.type}`}>
                        {message.message}

                        <button onClick={() => setMessage(null)} className="removeBox">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="R_SVG"
                            >
                                <g>
                                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                )}

                <button
                    className="sendButton"
                    // onClick={send_verification}
                    disabled={loading}
                >
                    {loading ? "Please wait..." : "Resend Verification"}
                </button>
            </div>
        </div>
    );
};

export default SendVerification;
