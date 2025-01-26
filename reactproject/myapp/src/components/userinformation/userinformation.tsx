import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authcontext";
import { get_user_by_token } from "../../api/userapi";
import css from "./userinformation.module.css";

export function Userinformation() {
    const mycontext = useContext(AuthContext);
    const token: any = mycontext?.token;
    const [userinformation, setuserinformation] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    const information = async () => {
        try {
            const myuser = await get_user_by_token(token);
            setuserinformation(myuser);
        } catch (error) {
            console.error("Error fetching user information:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            information();
        }
    }, [token]);

    return (
        <div className={css.container}>
            <h2 className={css.title}>מידע על המשתמש</h2>

            {loading ? (
                <p className={css.loading}>בטעינה...</p>
            ) : userinformation && userinformation.length > 0 ? (
                <div className={css.userInfoCard}>
                    {userinformation.map((info: string, index: number) => (
                        <p key={index}>{info}</p>
                    ))}
                </div>
            ) : (
                <p className={css.noData}>אין מידע זמין</p>
            )}
        </div>
    );
}
