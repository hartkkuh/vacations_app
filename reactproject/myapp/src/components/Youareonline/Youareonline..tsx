import css from "./Youareonline.module.css";
import { FaCheckCircle } from "react-icons/fa";

export function Youareonline() {
    return (
        <div className={css.container}>
            <FaCheckCircle className={css.icon} />
            <h1 className={css.title}>You are online</h1>
            <p className={css.message}>You are successfully connected and online.</p>
        </div>
    );
}
