import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authcontext";
import css from "./login.module.css"
import { useNavigate } from "react-router-dom";

export function Login() {
    const myContext = useContext(AuthContext);
    const [email, setEmail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [error, seterror] = useState<string | null>(null);
    const [success, setsuccess] = useState<string | null>(null);
    const Navigatei = useNavigate()

    const handlelogin = async (e: React.FormEvent) => {
        e.preventDefault();
        seterror(null);
        setsuccess(null);

        if (!email || !password) {
            seterror("Email and password are required");
            return;
        }

        try {
            const token = await myContext?.login(email, password);
            if (token) {
                setsuccess("Login successful");
                Navigatei("/vacations")
            } else {
                seterror("Login failed: no token received");
            }
        } catch (error: any) {
            seterror("Login failed: " + (error.response ? error.response.data["message"] : "Unknown error"));
        }
    };

    return (
        <div className={css.div}>
            <h1 className={css.h1}>Login</h1>
            <form className={css.from} onSubmit={handlelogin}>
                <p className={css.p}>Email</p>
                <input  className={css.input} type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <p className={css.p}>Password</p>
                <input className={css.input} type="password" required placeholder="Password" value={password} onChange={e => setpassword(e.target.value)} />
                <br /> <br />
                <button className={css.button} type="submit">Login</button>
            </form>
            {error && <p className={css.error}>{error}</p>}
            {success && <p className={css.success}>{success}</p>}
        </div>
    );
}