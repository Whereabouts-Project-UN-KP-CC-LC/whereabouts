import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import StartPage from './pages/StartPage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ChatPage from './components/ChatPage';
import Dashboard from './pages/Dashboard';

// creates a new Manager for the given host URL (https://socket.io/docs/v4/client-api/#manager)
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080/', {
  // path: '/chat',
});

export default function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone_number: '',
    password: '',
  });

  return (
    <>
      <h1>Testing APP landing</h1>
      <br></br>
      <div>
        Testing input from Phone input:
        {userInfo.phone_number}
      </div>
      <br></br>
      <div>
        Testing input from Password input:
        {userInfo.password}
      </div>
      <div className="main-container">
        <Registration userInfo={userInfo} setUserInfo={setUserInfo} />

        <Login userInfo={userInfo} setUserInfo={setUserInfo} />

        <Contacts />

        <br></br>
        <br></br>

        <MyTripStart />
      </div>
    </>
  );
}
