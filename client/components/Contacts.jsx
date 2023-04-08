import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneContact from './OneContact';
import { Navigate } from 'react-router-dom';

function Contacts(props) {

  // hook to manage input to verify if contact exists in db
  const [addContact, setAddContact] = useState({ phoneNum: '' });
  // hook to add additional contact cards to display
  const [renderContactCount, setRenderContactCount] = useState(0);

  const onChange = (event) => {
    setAddContact((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();

    // fetch request to db to verify user
    // axios.post('/api/users/phone', addContact).then((response) => {
    //   console.log(`post request from add contacts page`)
    //   console.log(response.data)
    // })

    // add contact to into OneContact component:
    // if user exists in db, then set rendercontact to true
    setRenderContactCount(renderContactCount + 1)

  }

  

  return (
    <div className='contacts-container'>
      <p>Hello from start of Contacts page</p>
      <br></br>
      <div className='add-contact-container'>
        <form onSubmit={handleSubmit} className='add-contact-form'>
          <p>Add a contact to your trip:</p>
          <input
            type='text'
            className='input-box'
            id='add-contact'
            name='phoneNum'
            value={addContact.phoneNum}
            onChange={onChange}
          />
          <button type='submit'className='submit-btn'>Add Contact</button>
        </form>
      </div>
      <br></br>
      <br></br>
      <div className='valid-contacts-container'>
        <div className='titles-row'>
          <p className='contact-title'>Name of Contact</p>
          <p className='contact-title'>Phone Number of Contact</p>
          <p className='contact-title'>Delete Contact?</p>
        </div>
        <br></br>
        <p>Dead Space</p>
        <br></br>
        <div className='contacts-display'>
          <h3>Inside of contacts display</h3>
          {/* <OneContact /> */}
          { [...Array(renderContactCount)].map((_, i) => <OneContact key={i} />) }
        </div>

      </div>

    </div>
  )
};

export default Contacts;