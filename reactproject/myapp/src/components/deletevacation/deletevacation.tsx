import { delete_vacation } from "../../api/vacationsapi";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authcontext";
import css from "./deletevacation.module.css";

export function Delete_vacation()  {
    const location = useLocation();
    const vacation = location.state?.vacation;
    const myContext = useContext(AuthContext);
    const token = myContext?.token;
    const [success, setsuccess] = useState<string | null>(null);
    const [error, seterror] = useState<string | null>(null);
    const navigate = useNavigate();

    const handlerdelete = async () => {
        if (!vacation || vacation.length === 0) {
            seterror("No vacation selected.");
            return;
        }

        try {
            await delete_vacation(token ?? "", vacation[0]);
            setsuccess("Vacation deleted successfully");
            navigate("/vacations");
        } catch (error: any) {
            seterror("Vacation deletion failed: " + error?.response?.data || error.message);
        }
    }

    return (
        <div className={css.container}>
            <h2 className={css.title}>Are you sure you want to delete the vacation?</h2>
            <button className={css.button} onClick={handlerdelete}>Delete Vacation</button>
            {success && <p className={css.success}>{success}</p>}
            {error && <p className={css.error}>{error}</p>}
        </div>
    );
}