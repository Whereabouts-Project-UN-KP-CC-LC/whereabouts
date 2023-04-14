import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import StartPage from './pages/StartPage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import ChatPage from './components/ChatPage';

export default function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone_number: '',
    password: '',
  });

  return (
    <>
      <Router>
        <div className="main-container">
          <div className="header-container">
            <Header />
          </div>

          <div className="body-container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <StartPage userInfo={userInfo} setUserInfo={setUserInfo} />
                }
              />
              <Route
                path="/login"
                element={
                  <Login userInfo={userInfo} setUserInfo={setUserInfo} />
                }
              />
              <Route
                path="/register"
                element={
                  <Registration userInfo={userInfo} setUserInfo={setUserInfo} />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard userInfo={userInfo} setUserInfo={setUserInfo} />
                }
              />
              <Route path="/chat" element={<ChatPage userInfo={userInfo} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}
