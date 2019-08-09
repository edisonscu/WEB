import React from 'react';
import Image_Loader from "react-load-image";

import loaderImage from '../assets/loader.svg';

interface ImageLoaderProps {
    src: string;
}

export default (props: ImageLoaderProps): JSX.Element => {
    return (
        <Image_Loader src={props.src} className="img-loader-container">
            <img />
            <div className="img-loader-error">Error</div>
            <img src={loaderImage} className="img-loader-loader" />
        </Image_Loader>
    );
}