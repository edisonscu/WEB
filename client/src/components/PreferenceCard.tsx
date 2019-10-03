import React, { useState } from 'react';
import { useSwipeable, Swipeable } from 'react-swipeable'

import ImageLoader from './ImageLoader';

interface PreferenceCardProps {
    title: string;
    image: string;
    handler: (type: string) => void;
}

export default ({ title, image, handler }: PreferenceCardProps): JSX.Element => {
    const [deltaX, setDeltaX] = useState(0);
    const [deltaY, setDeltaY] = useState(0);
    const [dragClass, setDragClass] = useState("");
    const [fadeClass,setFadeClass] = useState("");
    const [opacity,setOpacity] = useState(1);

    return (
        <Swipeable
            className={`preference__card ${dragClass} ${fadeClass}`}
            style={{
                transform: `translate(${-deltaX}px,${-deltaY}px)`
            }}
            onSwiping={(e) => {
                setDeltaX(e.deltaX);
                setDeltaY(e.deltaY);
                setFadeClass("");
                if (e.dir === "Left") setDragClass("preference__card--cross");
                else if (e.dir === "Right") setDragClass("preference__card--heart");
                else if (e.dir === "Up") setDragClass("preference__card--check");
            }}
            onSwiped={() => {
                setDeltaX(0);
                setDeltaY(0);
            }}
            onSwipedLeft={() => { 
                handler('dislike');
                setDragClass("");
                setFadeClass("preference__card--fadeIn");
            }}
            onSwipedUp={() => { 
                handler('ok');
                setDragClass("");
                setFadeClass("preference__card--fadeIn");
            }}
            onSwipedRight={() => { 
                handler('like');
                setDragClass("");
                setFadeClass("preference__card--fadeIn");
            }}
            preventDefaultTouchmoveEvent={true}
        >
            <h1 className="preference__card--title">{title}</h1>
            <div className="preference__card--image">
                <ImageLoader src={image} />
            </div>
        </Swipeable >
    );
}