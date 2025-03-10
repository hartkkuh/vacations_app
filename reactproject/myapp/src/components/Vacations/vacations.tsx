import { useEffect, useState, useContext } from "react";
import { get_all_vacations, get_like_by_user_id, addlikei, deletelike } from "../../api/vacationsapi";
import { AuthContext } from "../../contexts/authcontext";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import css from "./vacations.module.css";
import { useNavigate } from "react-router-dom";

export function Vacations() {
    const myContext = useContext(AuthContext);
    const token = myContext?.token || null;
    const [islikelist, setislikelist] = useState<{ [id: number]: boolean }>({});
    const [vacations, setVacations] = useState<[] | undefined>(undefined);
    const [loading, setloading] = useState<boolean>(true);
    const [filter, setFilter] = useState('');
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const getvacations = async () => {
        if (token) {
            try {
                const response = await get_all_vacations(token);
                setVacations(response);
                setSuccess("Vacations fetched successfully");
            } catch (err: any) {
                setError("Error fetching vacations: " + err);
            } finally {
                setloading(false);
            }
        } else {
            setError("No token found");
        }
    };

    const getLikesForUser = async () => {
        if (token && vacations) {
            try {
                const response = await get_like_by_user_id(token);
                const userLikes = response.data;

                const likesMap = userLikes.reduce((acc: { [id: number]: boolean }, like: [number, number]) => {
                    acc[like[1]] = true;
                    return acc;
                }, {});

                setislikelist(likesMap);
            } catch (err: any) {
                setError("Error fetching likes: " + err);
            }
        }
    };

    useEffect(() => {
        getvacations();
    }, []);

    useEffect(() => {
        if (vacations) {
            getLikesForUser();
        }
    }, [vacations]);

    const toggleLike = async (vacationId: number) => {
        if (token) {
            try {
                if (!islikelist[vacationId]) {
                    await addlikei(token, vacationId);
                    setislikelist(prevState => ({ ...prevState, [vacationId]: true }));
                    setSuccess("Like added successfully");
                } else {
                    await deletelike(token, vacationId);
                    setislikelist(prevState => ({ ...prevState, [vacationId]: false }));
                    setSuccess("Like removed successfully");
                }
            } catch (err: any) {
                setError("Error toggling like: " + err);
            }
        }
    };
    

    return (
        <div className={css.vacations_container}>
            {loading ? (
                <div className={css.loading_spinner}></div>
            ) : (
                <>
                    <input
                        className={css.filter_input}
                        type="text"
                        placeholder="Enter your filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {vacations
                        ?.filter((vacation) =>
                            Object.values(vacation).some(
                                (value) =>
                                    value &&
                                    value.toString().toLowerCase().includes(filter.toLowerCase())
                            )
                        )
                        .map((vacation, index) => (
                            <div className={css.vacation_item} key={index}>
                                {Object.entries(vacation).map(([key, value]) => (
                                    <p key={key}>
                                        {key !== '5' && key !== '0' && <span>{String(value)}</span>}
                                    </p>
                                ))}
                                <img src={vacation[5]} style={{ width: '300px', height: '200px' }} alt="Vacation" />
                                <button
                                    className={css.like_button}
                                    onClick={() => toggleLike(vacation[0])}
                                >
                                    {islikelist[vacation[0]] ? <FaThumbsDown size={20} color="red" /> : <FaThumbsUp size={20} color="green" />}
                                </button>
                                {myContext?.is_admin && (
                                    <button className={css.button} onClick={() => { navigate(`/management/vacations/delete`, { state: { vacation } }); }}>
                                        Delete Vacation
                                    </button>
                                )}
                                {myContext?.is_admin && (
                                    <button className={css.button} onClick={() => { navigate(`/management/vacations/update`, { state: { vacation } }); }}>
                                        Update Vacation
                                    </button>
                                )}
                            </div>
                        ))}
                </>
            )}
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            {myContext?.is_admin && (
                <button className={css.button} onClick={() => { navigate("/management/addvacation"); }}>
                    Add Vacation
                </button>
            )}
        </div>
    );
}
