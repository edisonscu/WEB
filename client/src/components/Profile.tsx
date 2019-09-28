import React from 'react';
import { Link } from 'react-router-dom';

import Typist from 'react-typist';

import ImageLoader from './ImageLoader';
import ButtonMain from './ButtonMain';

interface ProfileProps {
    name: string;
    picture: string;
}

export default ({ name, picture }: ProfileProps) => {
    return (
        <div className="profile">
            <Typist className="profile__title--container" avgTypingDelay={120} cursor={{ hideWhenDone: true }}>
                <span className="profile__title--text">Hello </span>
                <Typist.Delay ms={1000} />
                <span className="profile__title--text">{name}</span>
            </Typist>
            <ImageLoader src={picture} />
            <Link to="/preference">
                <ButtonMain
                    text="開始設定喜好！"
                    onClick={() => { }}
                />
            </Link>
        </div>
    );
}