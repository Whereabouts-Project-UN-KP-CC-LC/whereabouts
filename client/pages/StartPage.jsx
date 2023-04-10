import React from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';

function StartPage(props) {
  return (
    <>
      <div className="startpage-cont">
        <Login userInfo={props.userInfo} setUserInfo={props.setUserInfo}/>
      </div>
    </>
  )
}

export default StartPage;