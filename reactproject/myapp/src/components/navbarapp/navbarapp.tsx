import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authcontext'
import css from "./navbarapp.module.css"

export function Navbarapp():JSX.Element{
    const myContext = useContext(AuthContext);
    return (
        <div>    
            <nav className={css.container}>
                <Link className={css.link} to="/">Home</Link>
                {!myContext?.token && <Link className={css.link} to="/register">Register</Link>}
                {!myContext?.token && <Link className={css.link} to="/login">Login</Link>}
                {myContext?.token && <Link className={css.link} to="/vacations">Vacations</Link>}
                {myContext?.token && <Link className={css.link} to="/updetmyuser">updet my user</Link>}
                {myContext?.is_admin && <Link className={css.link} to="/userinformation">User Information</Link>}
                {myContext?.is_admin && <Link className={css.link} to="/selectuser">Select user</Link>}
                {myContext?.token && <Link className={css.link} to="/statistics">statistics</Link>}
                {myContext?.token && <Link className={css.link} to="/logout">Logout</Link>}

            </nav>
        </div>
    )
}
