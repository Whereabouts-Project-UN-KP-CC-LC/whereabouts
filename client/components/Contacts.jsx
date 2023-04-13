import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactsList from './ContactsList';

function Contacts({ contacts, setContacts }) {

  // hook to manage input to verify if contact exists in db
  // const [contacts, setContacts] = useState([]);

  // Fetch GET request for contact and add to list:
  const handleSubmit = async (event) => {

    event.preventDefault();
    //console.log('submit: ', event.target[0].value )

    //fetch request to get contact info
    try {
      const response = await axios.get('/api/users/' + event.target[0].value, event.target[0].value);
      
      const contactData = response.data[0];
      console.log('contactData ', contactData);

      // add user to array of contacts
      setContacts([...contacts, contactData]);
      
    } catch(err) {
      console.log(`Fetch request for user with phone_number failed.`, err);
    }
    
  };

  // function to delete contact from list, pass to contacts list
  const deleteContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  }
  

  return (
    <div className='contacts-container'>
      
      <br></br>
      <div className='add-contact-container'>
        <form onSubmit={handleSubmit} className='add-contact-form'>
          <p>Add contacts to your list:</p>
          <input
            type='text'
            className='input-box'
            id='contact-phone-number'
          />
          <button type='submit'className='submit-btn'>Add Contact</button>
        </form>
      </div>
      <br></br>
      <div className='valid-contacts-container'>
        <div className='titles-row'>
          <p className='contact-title'>Name of Contact</p>
          <p className='contact-title'>Phone Number of Contact</p>
          
        </div>
      
        <div className='contacts-display'>
          <h3>Select a few contacts to share your trip with:</h3>
          <ContactsList 
            contacts={contacts}
            deleteContact={deleteContact}
          />
        </div>

      </div>

    </div>
  )
};

export default Contacts;