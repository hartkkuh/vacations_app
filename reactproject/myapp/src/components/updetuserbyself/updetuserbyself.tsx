import { useContext, useState } from "react";
import { updet_user_by_token } from "../../api/userapi";
import { AuthContext } from "../../contexts/authcontext";
import css from "./updetuser.module.css";

export function Updateuserbyself() {
    const [email, setemail] = useState<string>("");
    const [first_name, setfirst_name] = useState<string>("");
    const [last_name, setlast_name] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [newpassword, setnewpassword] = useState<string>("");
    const [error, seterror] = useState<string | null>(null);
    const [success, setsuccess] = useState<string | null>(null);
    const myContext = useContext(AuthContext);

    const updetuser = async (e: React.FormEvent) => {
        e.preventDefault();
        seterror(null);
        setsuccess(null);

        if (!email || !first_name || !last_name || !password || !newpassword) {
            seterror("All fields are required");
            return;
        }

        if (!myContext?.token) {
            seterror("User is not authenticated");
            return;
        }

        try {
            await updet_user_by_token(myContext.token, first_name, last_name, email, password, newpassword);
            setsuccess("User updated successfully");
        } catch (error: any) {
            seterror("Error updating user: " + (error.response ? error.response.data["message"] : "Unknown error"));
            console.log(error);
        }
    };

    return (
        <div className={css.container}>
            <h2 className={css.title}>Update User Information</h2>
            <form onSubmit={updetuser} className={css.form}>
                <div className={css.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>New Password</label>
                    <input
                        type="password"
                        required
                        placeholder="Enter your new password"
                        value={newpassword}
                        onChange={e => setnewpassword(e.target.value)}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>First Name</label>
                    <input
                        required
                        type="text"
                        value={first_name}
                        onChange={e => setfirst_name(e.target.value)}
                        placeholder="Enter your first name"
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>Last Name</label>
                    <input
                        required
                        type="text"
                        placeholder="Enter your last name"
                        value={last_name}
                        onChange={e => setlast_name(e.target.value)}
                    />
                </div>

                <button type="submit" className={css.button}>Update User</button>

                {error && <p className={`${css.message} ${css.error}`}>{error}</p>}
                {success && <p className={`${css.message} ${css.success}`}>{success}</p>}
            </form>
        </div>
    );
}
