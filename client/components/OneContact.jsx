import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function OneContact(props) {

  
 
  return (
    <>
      <h1> Stuff for each contact added here:</h1>
      <div className='oneContact-container'>
        <p>Contact name here: (fetch from db) {}</p>
        <p>Contact phone number here: (fetch from db)</p>
        <button
          onClick={ () => props.setRenderContactCount(props.renderContactCount - 1) } 
          className='delete-contact-btn'
        >Delete Contact?</button>
      </div>
    </>
  )
}

export default OneContact;