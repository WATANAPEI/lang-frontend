import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App.tsx';

const title = "Hello, react with typescript";
ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById('app')
);
