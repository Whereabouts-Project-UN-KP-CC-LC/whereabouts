import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { redirect, Link, Routes, Route } from 'react-router-dom';
import Registration from './Registration';


function Login({ userInfo, setUserInfo }) {

  // handles input updates in input forms
  const onChange = (event) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const userLogin = {
      phone_number: userInfo.phone_number,
      password: userInfo.password
    }

    console.log(`userLogin: ${JSON.stringify(userLogin)}`);

    // Send post request to BE. Must verify user. Looking for 200 status in order to proceed
    axios.post('/api/login/', userLogin)
      .then((response) => { 
        // Not receiving 200 status as planned
        // Need a redirect here to dashbord
        console.log('login was success');
        redirect('/dashboard');
      })
      .catch((error) => {
        if (error) {
          alert(`Please check login information and try again.`);
        }
      })

  };

  return (
    <div className='login-container'>
      <h3>Already a member? Please login</h3>
      <br></br>
      <form onSubmit={handleSubmit} className='form-container'>
        <br></br>
        <div className='input-container'>
          <p>Login Phone Number:</p>
          <br></br>
          <input 
            type='text'
            className='input-box'
            id='phone_number'
            name='phone_number'
            value={userInfo.phone_number}
            onChange={onChange}
          />
        </div>
        <br></br>
        <br></br>
        <div className='input-container'>
          <p>Login Password:</p>
          <br></br>
          <input 
            type='text'
            className='input-box'
            id='password'
            name='password'
            value={userInfo.password}
            onChange={onChange}
          />
        </div>
        <br></br>
        <button type='submit' className='submit-btn' >Submit Login</button>
      </form>

      <p>Don't have a login? 
        <Link to='/register'> Sign up here!</Link>
      </p>
      
      
    </div>
  )
};

export default Login;