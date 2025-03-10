import { useContext, useEffect, useState } from "react";
import { total_likes, total_likes_by_vacation, total_users, vacations_nambers } from "../../api/vacationsapi";
import { AuthContext } from "../../contexts/authcontext";


export function Statistics() {
    const myContext = useContext(AuthContext);
    const token = myContext?.token || null;
    const [start_vacations, setstart_vacations] = useState<number | null>(null);
    const [end_vacations, setend_vacations] = useState<number | null>(null);
    const [on_vacations, seton_vacations] = useState<number | null>(null);
    const [likes, setlikes] = useState<[] | null>(null);

    const [totalusers, settotalusers] = useState<number | null>(null);
    const [totallikes, settotallikes] = useState<number | null>(null);

    const handlertotalslikes = async () => {
        if (!token) return;
        try {
            const response = await total_likes(token);
            settotallikes(response.total_likes);
        } catch (error: any) {
            console.log("Get statistics failed: " + error.response.data);
        }
    };

    const handlertotalusers = async () => {
        if (!token) return;
        try {
            const response = await total_users(token);
            settotalusers(response.total_users);
        } catch (error: any) {
            console.log("Get statistics failed: " + error.response.data);
        }
    };

    const handlervacationsnum = async () => {
        if (!token) return;
        try {
            const response = await vacations_nambers(token);
            seton_vacations(response.on_vacations);
            setend_vacations(response.end_vacations);
            setstart_vacations(response.start_vacations);
        } catch (error: any) {
            console.log("Get statistics failed: " + error.response.data);
        }
    };

    const handlerlikes = async () => {
        if (!token) return;
        try {
            const response = await total_likes_by_vacation(token);
            console.log(response.total_likes);
            setlikes(response.total_likes);
        } catch (error: any) {
            console.log("Get statistics failed: " + error.response);
        }
    }
    useEffect(() => {
        handlertotalslikes();
        handlertotalusers();
        handlervacationsnum();
        handlerlikes();
    }, []);

    return (
        <div>
            <h1>total likes : {totallikes}</h1>
            <h1>total users : {totalusers}</h1>
            <h1>on vacations : {on_vacations}</h1>
            <h1>start vacations : {start_vacations}</h1>
            <h1>end the vacations : {end_vacations}</h1>
            {likes && likes.map((like: any) => {
                return (
                    <div key={like.vacation_id}>
                        <h1>vacation id : {like[0]}</h1>
                        <h1>likes : {like[3]}</h1>
                    </div>
                )
            })}
        </div>
    );
}