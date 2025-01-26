import { useContext, useEffect, useState } from "react";
import { add_vacation, get_all_countries } from "../../api/vacationsapi";
import { AuthContext } from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import css from "./addvacation.module.css";

export const Addvacations = () => {
    const [country_id, setcountry_id] = useState<number | null>(null);
    const [vacation_description, setvacation_description] = useState<string | null>(null);
    const [start_date, setstart_date] = useState<string | null>(null);
    const [end_date, setend_date] = useState<string | null>(null);
    const [price, setprice] = useState<number | null>(null);
    const [image_url, setimage_url] = useState<string | null>(null);
    const [countries, setcountries] = useState<[] | null>(null);
    const [success, setsuccess] = useState<string | null>(null);
    const [error, seterror] = useState<string | null>(null);
    const myContext = useContext(AuthContext);
    const token = myContext?.token;
    const navigate = useNavigate();

    const handleraddvacation = async (e: React.FormEvent) => {
        e.preventDefault();
        seterror(null);
        setsuccess(null);

        if (!country_id || !vacation_description || !start_date || !end_date || !price || !image_url) {
            seterror("all required fields are missing");
            return;
        }

        try {
            await add_vacation(token ?? "", country_id, vacation_description, start_date, end_date, price, image_url);
            setsuccess("Vacation added successfully");
            navigate("/vacations");
        } catch (error: any) {
            seterror("Add vacation failed: " + error.response.data);
        }
    };

    const handlergetcountries = async () => {
        try {
            const response = await get_all_countries(token ?? "");
            return response;
        } catch (error: any) {
            seterror("Get countries failed: " + error.response.data);
        }
    };

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await handlergetcountries();
            if (res) {
                setcountries(res);
            }
        };
        fetchCountries();
    }, []);

    return (
        <div className={css.container}>
            <h2 className={css.title}>Add Vacation</h2>
            <form className={css.form} onSubmit={handleraddvacation}>
                <div className={css.inputGroup}>
                    <label>Select Country:</label>
                    <select value={country_id ?? ''} onChange={(e) => setcountry_id(Number(e.target.value))}>
                        {countries?.map((country, index) => (
                            <option key={index} value={country[0]}>
                                {country[1]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={css.inputGroup}>
                    <label>Vacation Description:</label>
                    <input
                        type="text"
                        value={vacation_description ?? ''}
                        onChange={(e) => setvacation_description(e.target.value)}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={start_date ?? ''}
                        onChange={(e) => setstart_date(e.target.value)}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={end_date ?? ''}
                        onChange={(e) => setend_date(e.target.value)}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price ?? ''}
                        onChange={(e) => setprice(Number(e.target.value))}
                    />
                </div>

                <div className={css.inputGroup}>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={image_url ?? ''}
                        onChange={(e) => setimage_url(e.target.value)}
                    />
                </div>

                <button className={css.button} type="submit">Add Vacation</button>
            </form>

            {success && <p className={css.success}>{success}</p>}
            {error && <p className={css.error}>{error}</p>}
        </div>
    );
};
