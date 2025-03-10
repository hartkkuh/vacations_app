import { Link } from 'react-router-dom'
import css from "./navbarapp.module.css"

export function Navbarapp():JSX.Element{
    return (
        <div>    
            <nav className={css.container}>
                <Link className={css.link} to="/">Home</Link>
                <Link className={css.link} to="/register">Register</Link>
                <Link className={css.link} to="/login">Login</Link>
                <Link className={css.link} to="/vacations">Vacations</Link>
                <Link className={css.link} to="/logout">Logout</Link>
                <Link className={css.link} to="/updetmyuser">updet my user</Link>
                <Link className={css.link} to="/userinformation">User Information</Link>
                <Link className={css.link} to="/selectuser">Select user</Link>
                <Link className={css.link} to="/statistics">statistics</Link>

            </nav>
        </div>
    )
}
