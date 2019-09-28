import React from 'react';
import ImageLoaderLib from "react-load-image";

import loaderImage from '../assets/loader.svg';

interface ImageLoaderProps {
    src: string;
}

export default (props: ImageLoaderProps): JSX.Element => {
    return (
        <ImageLoaderLib src={props.src} className="img-loader-container">
            <img alt="loader_image" />
            <div className="img-loader-error">Error</div>
            <img src={loaderImage} className="img-loader-loader" alt="loader_image" />
        </ImageLoaderLib>
    );
}