import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import jwt from 'jsonwebtoken';

import Profile from './components/Profile';
import Preference from './components/Preference';

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
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact render={(props) => <Profile {...props} name={result.name} picture={result.picture} />} />
                        <Route path="/preference" render={(props) => <Preference {...props} id={result.sub} />} />
                    </Switch>
                </BrowserRouter>
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
