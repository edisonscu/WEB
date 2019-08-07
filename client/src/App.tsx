import React from 'react';
import jwt from 'jsonwebtoken';

interface AppProps {
    token: string;
}

interface Result{
    amr:string[];
    aud:string; // channel id
    exp:number;
    iat:number;
    iss:string;
    name:string; // user name
    picture:string; // user profile picture
    sub:string; // user id
}

const App: React.FC<AppProps> = ({ token }) => {
    const result = jwt.decode(token) as Result;
    return (
        <div className="App">
            Hello {result.name} 
            {result.sub}
            <img src={result.picture} alt="profile image"/>
        </div>
    );
}

export default App;
