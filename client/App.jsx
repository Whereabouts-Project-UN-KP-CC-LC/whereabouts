import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Contacts from './components/Contacts';
import MyTripStart from './components/MyTripStart';


export default function App() {
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone_number: '',
    password: '',
  })

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
      <div className='main-container'>
        
        <Login 
          userInfo={userInfo} setUserInfo={setUserInfo}
        />

        <Contacts />

        <br></br>
        <br></br>

        <MyTripStart />

      </div>
    </>
  )
};


