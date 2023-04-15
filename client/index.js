import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { render } from 'react-dom';
import { io } from 'socket.io-client';

// initialize socket on client side
// creates a new Manager for the given host URL (https://socket.io/docs/v4/client-api/#manager)
const socket = io('http://localhost:3000/', {
  autoConnect: false,
});

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<App />);

export default socket;
