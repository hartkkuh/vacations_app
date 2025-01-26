import { useContext, useState } from "react";
import { updet_user_by_id } from "../../api/userapi";
import { AuthContext } from "../../contexts/authcontext";
import { useLocation } from "react-router-dom";
import css from "./updetuserbyadmin.module.css";

export function Updetuserbyadmin() {
    const [email, setemail] = useState<string>("");
    const [first_name, setfirst_name] = useState<string>("");
    const [last_name, setlast_name] = useState<string>("");
    const [error, seterror] = useState<string | null>(null);
    const [success, setsuccess] = useState<string | null>(null);
    const myContext = useContext(AuthContext);
    const location = useLocation();
    const user = location.state;
    const user_id = location.state.user_id;

    const updetuser = async (e: React.FormEvent) => {
        e.preventDefault();
        seterror(null);
        setsuccess(null);

        if (!email || !first_name || !last_name) {
            seterror("All fields are required");
            return;
        }

        if (!myContext?.token) {
            seterror("User is not authenticated");
            return;
        }

        try {
            await updet_user_by_id(user_id, myContext.token, first_name, last_name, email);
            setsuccess("User updated successfully");
        } catch (error: any) {
            seterror("Error updating user: " + (error.response ? error.response.data["message"] : "Unknown error"));
            console.log(error);
        }
    };

    return (
        <div className={css.container}>
            <h2 className={css.title}>Update User Information (Admin)</h2>

            <div className={css.userDetails}>
                <p><strong>User ID:</strong> {user.user_id}</p>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role_name}</p>
            </div>

            <form onSubmit={updetuser} className={css.form}>
                <div className={css.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>First Name</label>
                    <input
                        required
                        type="text"
                        value={first_name}
                        onChange={e => setfirst_name(e.target.value)}
                        placeholder="Enter first name"
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>Last Name</label>
                    <input
                        required
                        type="text"
                        value={last_name}
                        onChange={e => setlast_name(e.target.value)}
                        placeholder="Enter last name"
                    />
                </div>

                <button type="submit" className={css.button}>Update User</button>

                {error && <p className={`${css.message} ${css.error}`}>{error}</p>}
                {success && <p className={`${css.message} ${css.success}`}>{success}</p>}
            </form>
        </div>
    );
}
