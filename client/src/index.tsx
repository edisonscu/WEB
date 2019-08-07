import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root');
if (root) {
    const token = root.dataset.token;
    ReactDOM.render(<App token={token!} />, root);
}