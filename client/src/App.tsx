import React from 'react';

interface AppProps {
    token?: string;
}

const App: React.FC<AppProps> = ({ token }) => {
    return (
        <div className="App">
            hello {token}
        </div>
    );
}

export default App;
