import React, { useState, useEffect } from 'react';
import axios from "axios";

import PreferenceCard from './PreferenceCard';

import loader from '../assets/loader2.svg';
import like from '../assets/icons8-happy-50.png';
import ok from '../assets/icons8-neutral-50.png';
import dislike from '../assets/icons8-sad-50.png';
import completeIcon from '../assets/icons8-completed-task-64.png';

interface Food {
    foodType: string;
    tags: string[];
    pic:string;
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

    if (foods.length === 0) {
        return (
            <div className="preference">
                <img src={loader} alt="loader" />
            </div>
        )
    } else if (complete) {
        return (
            <div className="preference">
                <h1 className="finish--text">Finish</h1>
                <img src={completeIcon} alt="complete"/>
            </div>
        )
    }

    const currentFood = foods[current] as Food;

    return (
        <div className="preference">
            <PreferenceCard title={currentFood.foodType} image={currentFood.pic} handler={handleButtonClick} />
            <div className="preference__control">
                <div className="preference__control--button cross" onClick={() => { handleButtonClick('dislike') }} >
                    <img src={dislike} alt="dislike" />
                </div>
                <div className="preference__control--button check" onClick={() => { handleButtonClick('ok') }} >
                    <img src={ok} alt="ok" />
                </div>
                <div className="preference__control--button heart" onClick={() => { handleButtonClick('like') }} >
                    <img src={like} alt="like" />
                </div>
            </div>
            <footer className="credit_message">
                <a target="_blank" href="https://icons8.com/icons/set/happy" rel="noopener noreferrer">Happy</a>, <a target="_blank" href="https://icons8.com/icons/set/neutral-emoticon--v2" rel="noopener noreferrer">Neutral</a> and other icons by <a target="_blank" href="https://icons8.com" rel="noopener noreferrer">Icons8</a>
            </footer>
        </div>
    );
}