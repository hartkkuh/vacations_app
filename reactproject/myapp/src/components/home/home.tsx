import css from "./home.module.css"

export function Home(): JSX.Element {
    return (
        <div>
            <h1 className={css.h1}>home of the app</h1>
        </div>
    );
}