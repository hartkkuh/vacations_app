import { Navbarapp } from "../components/navbarapp/navbarapp";
import { Routing } from "../routing/routing";
import css from './layout.module.css';
import { Header } from "../components/heder/heder";

export function Layout() {

    return (
            <div className={css.layoutContainer}>
                <div className={css.mainContent}>
                    <div className={css.header}>
                        <Header />
                    </div>
                    <div className={css.navbarContainer}>
                        <Navbarapp />
                    </div>
                    <div className={css.contentContainer}>
                        <Routing />
                    </div>
                </div>
            </div>
    );
}