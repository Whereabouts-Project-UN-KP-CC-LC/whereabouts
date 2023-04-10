import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
// import { store } from './app/store';
// import { Provider } from 'react-redux';
import { render } from 'react-dom';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<App />);
