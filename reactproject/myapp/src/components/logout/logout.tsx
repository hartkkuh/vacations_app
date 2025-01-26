import { useContext } from "react";
import { AuthContext } from "../../contexts/authcontext";
import styles from "./logout.module.css";

export function Logout(): JSX.Element {
    const myContext = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Are you sure you want to logout?</h2>
            <button className={styles.logoutButton} onClick={myContext?.logout}>
                Logout
            </button>
        </div>
    );
}
