import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import CheckboxList from './CheckboxList';

// Start new trip button
// List of contacts to send trip to


function MyTripStart(props) {


  return (
    <>
      <div className='myTripStart-container'>
        <h1>Inside of MyTripStart Component</h1>
        <section className='select-contact-list'>
          <h2>Select your contacts for following trip:</h2>
          <div className='select-contact-list-display'>
            <CheckboxList />
          </div>
        </section>
      </div>
      
    </>
  )
}


export default MyTripStart;