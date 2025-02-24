import { Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent } from "react";
import "./css/login.css";

interface UserFormData {
    email: string;
    password: string;
}

export default function Register() {
    const { data, setData, post, processing, errors } = useForm<UserFormData>({
        email: "",
        password: "",
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof UserFormData, value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="loginCon">
            <div className="appName">PIXEL</div>

            <div className="formCover">
                <div style={{ textAlign: "center" }}>Login to your account</div>

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
                        Don't have an account ?{" "}
                        <Link href="/register">Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
