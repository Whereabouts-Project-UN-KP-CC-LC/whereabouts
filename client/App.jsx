import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

export default function App() {
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    password: '',
  })

  return (
    <>
      <h1>Testing APP landing</h1>
      <br></br>
      <div>
        Testing input from Phone input:
        {userInfo.phone}
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
      </div>
    </>
  )
};


