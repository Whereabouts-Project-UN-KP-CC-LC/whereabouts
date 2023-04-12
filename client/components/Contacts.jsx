import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneContact from './OneContact';
import { Navigate } from 'react-router-dom';

function Contacts(props) {

  // hook to manage input to verify if contact exists in db
  const [addContact, setAddContact] = useState('');
  // hook to add additional contact cards to display
  const [renderContactCount, setRenderContactCount] = useState([]);
  //hook to capture data to add a contact
  const [dataForContact, setDataForContact] = useState(null);


  const onChange = (event) => {
    setAddContact((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // fetch request to db to verify user
    console.log(`checking to see what addContact is without key: ${JSON.stringify(addContact)}`);
    console.log(`checking to see what addContact is: ${JSON.stringify(addContact["phone_number"])}`);

    let response = await axios.get(`/api/users/${addContact["phone_number"]}`, addContact);
     
    response = JSON.stringify(response);
    console.log(`response.data: ${response.data}`);
    console.log(`response.status: ${response.status}`);

      
      // .catch(err => {
      //   console.log(`Error inside GET request for user by phone.`), err;
      // })
    

    
    // if (response.status === 200) {
    //   console.log(`Get user with phone_number successful`)
    //   setDataForContact(response.data);
    // } else {
    //   throw new Error('Problem getting contact with phone_number');
    // }
  
    // successful GET request will add user to state, accessible from OneContact component
    

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
            name='phone_number'
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