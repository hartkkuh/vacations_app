import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authcontext";
import { get_all_users } from "../../api/userapi";
import { myUsers } from "../../models";
import { useNavigate } from "react-router-dom";
import css from "./selectuser.module.css"

export function Selectuser() {
    const myContext = useContext(AuthContext);
    const token: any = myContext?.token;
    const [users, setusers] = useState<myUsers[] | null>(null);
    const navigatei = useNavigate();

    const all_users = async () => {
        try {
            const respoins = await get_all_users(token);
            setusers(respoins);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        all_users();
    }, []);

    return (
        <div className={css.container}>
            {users?.map((user) => (
                <div className={css.userCard} key={user.user_id}>
                    <p><strong>First Name:</strong> {user.first_name}</p>
                    <p><strong>Last Name:</strong> {user.last_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Password:</strong> {user.password}</p>
                    <p className={css.role}><strong>Role:</strong> {user.role_name}</p>
                    <p className={user.is_admin ? css.admin : ''}><strong>Admin:</strong> {user.is_admin ? "Yes" : "No"}</p>
                    {myContext?.is_admin && <button className={css.button} onClick={() => navigatei(`/management/users`, { state: user })}>
                        Select User
                    </button>}
                </div>
            ))}
        </div>
    );
}