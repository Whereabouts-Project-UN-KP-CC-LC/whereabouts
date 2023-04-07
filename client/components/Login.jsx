import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


function Login() {

  const onChange = (event) => {
    props.setUserInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userLogin = {
      phone: props.userInfo.phone,
      password: props.userInfo.password
    }

    console.log(`userLogin: ${JSON.stringify(userLogin)}`);

    // axios.get('/api/users/', userLogin).then((response) =>{

    //   console.log(response.data)
    // })

  };

  return (
    <div className='login-container'>
      <h3>Already a member? Please login</h3>
      <br></br>
      {/* <form className='form-container'> */}
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <p>Login Phone Number:</p>
          <br></br>
          <input 
            type='text'
            className='input-box'
            id='phone'
            name='phone'
            value={props.userInfo.phone}
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
        <button type='submit' className='styleMe' >Submit Login</button>
      </form>
    </div>
  )
};

export default Login;