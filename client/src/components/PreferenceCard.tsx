import React from 'react';

import ImageLoader from './ImageLoader';

interface PreferenceCardProps {
    title: string;
    image: string;
}

export default ({ title, image }: PreferenceCardProps): JSX.Element => {
    return (
        <div className="preference__card">
            <h1 className="preference__card--title">{title}</h1>
            <div className="preference__card--image">
                <ImageLoader src={image} />
            </div>
        </div>
    );
}