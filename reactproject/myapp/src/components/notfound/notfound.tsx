import css from "./notfound.module.css";

export function Notfound() {
    return (
        <div className={css.container}>
            <h2 className={css.subtitle}>Sorry</h2>
            <h2 className={css.subtitle}>Your page is not available in the app</h2>
            <h1 className={css.h1}>Page Not Found</h1>
        </div>
    );
}