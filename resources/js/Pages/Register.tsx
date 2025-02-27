import { Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent } from "react";
import "./css/login.css";

interface UserFormData {
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors } = useForm<UserFormData>({
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof UserFormData, value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <div className="loginCon">
            <div className="inner">
                <div className="appName">
                    <b>PIXEL</b>
                </div>

                <div className="formCover">
                    <div style={{ textAlign: "center" }}>Create account</div>

                    <form onSubmit={onSubmit}>
                        <fieldset>
                            <legend>Email: </legend>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="E-mail"
                                onInput={handleInput}
                            />
                        </fieldset>
                        {!processing && errors.email && (
                            <div className="error">{errors.email}</div>
                        )}

                        <fieldset>
                            <legend>Password: </legend>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Password"
                                onInput={handleInput}
                            />
                        </fieldset>

                        {!processing && errors.password && (
                            <div className="error">{errors.password}</div>
                        )}

                        <fieldset>
                            <legend>Confirm Password: </legend>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Confirm Password"
                                onInput={handleInput}
                            />
                        </fieldset>

                        <div>
                            <button
                                type="submit"
                                className="submitBtn"
                                disabled={processing}
                            >
                                Submit
                            </button>
                        </div>

                        <div className="formLink">
                            Already have an account ?{" "}
                            <Link href="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
