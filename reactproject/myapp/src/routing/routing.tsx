import { Routes, Route } from "react-router-dom"
import { Home } from "../components/home/home"
import { Login } from "../components/login/login"
import { Register } from "../components/register/register"
import { Notfound } from "../components/notfound/notfound"
import { Vacations } from "../components/Vacations/vacations"
import { Youareonline } from "../components/Youareonline/Youareonline."
import { useContext } from "react"
import { AuthContext } from "../contexts/authcontext"
import { Updateuserbyself } from "../components/updetuserbyself/updetuserbyself"
import { Selectuser } from "../components/selectuser/selectuser"
import { Logout } from "../components/logout/logout"
import { Userinformation } from "../components/userinformation/userinformation"
import { Updetuserbyadmin } from "../components/updetuserbyadmin/updetuserbyadmin"
import { Addvacations } from "../components/addvacation/addvacations"
import { Delete_vacation } from "../components/deletevacation/deletevacation"
import { Updatevacations } from "../components/updatevacation/updatevacation"

export function Routing(){
    const myContext = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={myContext?.token ? <Youareonline /> : <Login />} />
            <Route path="/register" element={myContext?.token ? <Youareonline /> : <Register />} />
            <Route path="/vacations" element={myContext?.token ? <Vacations /> : <Login />} />
            <Route path="/*" element={<Notfound />} />
            <Route path="/logout" element={myContext?.token ? <Logout /> : <Login />} />
            <Route path="/updetmyuser" element={myContext?.token ? <Updateuserbyself /> : <Login />} />
            <Route path="/selectuser" element={<Selectuser />} />
            <Route path="/userinformation" element={myContext?.token ? <Userinformation/> : <Login/>}/>
            {myContext?.is_admin && <Route path="/management/users" element={<Updetuserbyadmin/>}/>}
            {myContext?.is_admin && <Route path="/management/addvacation" element={<Addvacations/>}/>}
            {myContext?.is_admin && <Route path="/management/vacations/update" element={<Updatevacations/>}/>}
            {myContext?.is_admin && <Route path="/management/vacations/delete" element={<Delete_vacation/>}/>}
        </Routes>
    )
}