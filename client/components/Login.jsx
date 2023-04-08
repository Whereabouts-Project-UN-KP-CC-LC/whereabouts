import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


function Login(props) {

  const onChange = (event) => {
    props.setUserInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userLogin = {
      phoneNum: props.userInfo.phone_number,
      password: props.userInfo.password
    }

    console.log(`userLogin: ${JSON.stringify(userLogin)}`);

    axios.get('/api/login/', userLogin).then((response) => { 
      // Need a redirect here to dashbord
      console.log(`Inside login request from FE: ${JSON.stringify(response.data)}`)
    })

  };

  return (
    <div className='login-container'>
      <h3>Already a member? Please login</h3>
      <br></br>
      {/* <form className='form-container'> */}
      <form onSubmit={handleSubmit} className='form-container'>
        <p>Top of form container</p>
        <br></br>
        <div className='input-container'>
          <p>Login Phone Number:</p>
          <br></br>
          <input 
            type='text'
            className='input-box'
            id='phone_number'
            name='phone_number'
            value={props.userInfo.phone_number}
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
            value={props.userInfo.password}
            onChange={onChange}
          />
        </div>
        <br></br>
        <button type='submit' className='submit-btn' >Submit Login</button>
      </form>
      
    </div>
  )
};

export default Login;