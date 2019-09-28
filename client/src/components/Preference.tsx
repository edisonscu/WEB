import React, { useState, useEffect } from 'react';
import axios from "axios";

import PreferenceCard from './PreferenceCard';

import fc from "../assets/fc.jpg";
import loader from '../assets/loader2.svg';

interface Food {
    foodType: string;
    tags: string[];
}

interface UserPreference {
    like: string[];
    ok: string[];
    dislike: string[];
}

interface PreferenceProps {
    id: string;
}

export default ({ id }: PreferenceProps): JSX.Element => {
    const [foods, setFoods] = useState<[Food?]>([]);
    const [current, setCurrent] = useState<number>(0);
    const [complete, setComplete] = useState<boolean>(false);
    const [userPreference, setUserPreference] = useState<UserPreference | null>({ like: [], ok: [], dislike: [] });

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        const foodRes = await axios.get('/food');
        try {
            const userRes = await axios.get(`/user?user_id=${id}`);
        } catch (e) {
            const fd = new FormData();
            fd.set('user_id', id);
            const userRes = await axios.post('/user', fd);
        }
        setFoods(foodRes.data.foods);
    }

    const handleButtonClick = (type: string) => {
        const food = foods[current] as Food;
        const pref = userPreference as UserPreference;
        pref[type as keyof UserPreference].push(food.foodType);
        setUserPreference(pref);
        console.log(pref);
        if (current < foods.length - 1) {
            setCurrent(current + 1);
        } else {
            setComplete(true);
            const fd = new FormData();
            fd.set('user_id', id);
            fd.set('preference', JSON.stringify(userPreference));
            axios.put('/user', fd);
        }
    };

    if (foods.length == 0) {
        return (
            <div className="preference">
                <img src={loader} alt="loader" />
            </div>
        )
    } else if (complete) {
        return (
            <div className="preference">
                Finish
            </div>
        )
    }

    const currentFood = foods[current] as Food;

    return (
        <div className="preference">
            <PreferenceCard title={currentFood.foodType} image={fc} />
            <div className="preference__control">
                <div className="preference__control--button cross" onClick={() => { handleButtonClick('dislike') }} >&#10008;</div>
                <div className="preference__control--button check" onClick={() => { handleButtonClick('ok') }} >&#10004;</div>
                <div className="preference__control--button heart" onClick={() => { handleButtonClick('like') }} >&hearts;</div>
            </div>
        </div>
    );
}