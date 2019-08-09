import React from 'react';

import jwt from 'jsonwebtoken';
import Typist from 'react-typist';

import ImageLoader from './components/ImageLoader';
import ButtonMain from './components/ButtonMain';

interface AppProps {
    token?: string;
}

interface Result {
    amr: string[];
    aud: string; // channel id
    exp: number;
    iat: number;
    iss: string;
    name: string; // user name
    picture: string; // user profile picture
    sub: string; // user id
}

const App: React.FC<AppProps> = ({ token }) => {
    if (token) {
        const result = jwt.decode(token) as Result;
        return (
            <div className="container">
                <div className="profile">
                    <Typist className="profile__title--container" avgTypingDelay={120} cursor={{ hideWhenDone: true }}>
                        <span className="profile__title--text">Hello </span>
                        <Typist.Delay ms={1000} />
                        <span className="profile__title--text">{result.name}</span>
                    </Typist>
                    <ImageLoader src={result.picture} />
                    <ButtonMain
                        text="開始設定喜好！"
                        onClick={() => { }}
                    />
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="welcome">
                Please login
            </div>
        </div>
    );
}

export default App;
