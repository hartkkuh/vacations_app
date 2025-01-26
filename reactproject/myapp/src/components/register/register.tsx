import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authcontext";
import css from "./register.module.css";

export function Register() {
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [first_name, setfirst_name] = useState<string>("");
    const [last_name, setlast_name] = useState<string>("");
    const [error, seterror] = useState<string | null>(null);
    const [success, setsuccess] = useState<string | null>(null);

    const myContext = useContext(AuthContext)

    const handleregister = async (e: React.FormEvent) => {
        e.preventDefault();
        seterror(null);
        setsuccess(null);
        
        if (!email || !password || !first_name || !last_name) {
            seterror("all fields are required");
            return;
        }
        
        try {
            await myContext?.register(first_name, last_name, email, password);
            setsuccess("user registered successfully");
        } catch (error: any) {
            seterror("error registering user" + (error.response ? error.response.data["message"] : "Unknown error"));
        }
        if (!email || !password) {
            seterror("Email and password are required")
            return
        }

        try {
            const token = await myContext?.login(email, password);
            if (token) {
                setsuccess("Login successful");
            } else {
                seterror("Login failed: no token received")
            }
        } catch (error: any) {
            seterror("Login failed: " + (error.response ? error.response.data["message"] : "Unknown error"));
        }

    };

    return (
        <div className={css.container}>
            <h2 className={css.title}>Register</h2>
            <form onSubmit={handleregister} className={css.form}>
                <div className={css.inputGroup}>
                    <label className={css.label}>Email</label>
                    <input
                        className={css.input}
                        type="email" 
                        required 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={e => setemail(e.target.value)} 
                    />
                </div>
                
                <div className={css.inputGroup}>
                    <label className={css.label}>Password</label>
                    <input
                         className={css.input}
                        type="password" 
                        required 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={e => setpassword(e.target.value)} 
                    />
                </div>
                
                <div className={css.inputGroup}>
                    <label className={css.label}>first name</label>
                    <input
                         className={css.input}
                        required
                        type="text" 
                        value={first_name}
                        onChange={e => setfirst_name(e.target.value)}
                        placeholder="Enter your first name"
                    />
                </div>
                
                <div className={css.inputGroup}>
                    <label className={css.label}>last name</label>
                    <input
                        className={css.input}
                        required
                        type="text"
                        placeholder="Enter your last name"
                        value={last_name}
                        onChange={e => setlast_name(e.target.value)}
                    />
                </div>                
                <button className={css.button} type="submit">Register</button>
                {error && <p className={css.error}>{error}</p>}
                {success && <p className={css.success}>{success}</p>}
            </form>
        </div>
    );
}
