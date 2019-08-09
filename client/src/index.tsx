import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './scss/index.scss';

const root = document.getElementById('root') as HTMLElement;
const token = root.dataset.token;
ReactDOM.render(<App token={token} />, root);