import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactsList from './ContactsList';

function Contacts({ userInfo, contacts, setContacts }) {

  // hook to manage contacts checked from list
  const [checkedContacts, setCheckedContacts] = useState([]);

  // Fetch GET request for contact and add to list:
  const handleSubmit = async (event) => {

    event.preventDefault();
    //console.log('submit: ', event.target[0].value )

    //fetch request to get contact info
    try {
      const response = await axios.get('/api/users/' + event.target[0].value, event.target[0].value);
      
      const contactData = response.data[0];
      // console.log('contactData: ', contactData);

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

  // function to extract phone numbers from checkedContacts array
  const extractPhoneNumbers = (array) => {
    return array.map((obj) => obj.phone_number);
  }; 

  // declare variable to contain proper info to send backend
  const tripData = {
    'traveler': userInfo.phone_number,
    'watchers': extractPhoneNumbers(checkedContacts)
  };


  // function to send post request to back end with user information to start trip
  const handleStartTrip = () => {
    // create a post request to the route: /api/trips/start
    axios.post('/api/trips/start', tripData)
      .then((response) => {
        console.log('Successful response from back end ', response);
      })
      .catch((error) => {
        if (error) {
          alert(`Please check contacts information and try again`);
        }
      })
  };


  // // checking state of contacts data:
  // useEffect(() => {
  //   console.log('Currnt checkedContacts:', checkedContacts);
  //   console.log('Current User phone: ', userInfo.phone_number);
  //   console.log('Current trip data: ', tripData);
  // }, [checkedContacts, userInfo.phone_number, tripData]);

  return (
    <div className='contacts-container'>
      
      <br></br>
      <div className='add-contact-container'>
        <form onSubmit={handleSubmit} className='add-contact-form'>
          <p>Add contacts to your list:</p>
          <input
            type='text'
            className='add-contact-input'
            id='contact-phone-number'
          />
          <button type='submit'className='add-contact-btn'>Add Contact</button>
        </form>
      </div>
      <br></br>
      <div className='valid-contacts-container'>
        <div className='titles-row'>
          <button 
            className="start-trip-button" 
            role="button"
            onClick={handleStartTrip}
            >
            Start Your Trip!
          </button>
        </div>
      
        <div className='contacts-display'>
          <h3>Select a few contacts to share your trip with:</h3>
          <ContactsList 
            contacts={contacts}
            deleteContact={deleteContact}
            checkedContacts={checkedContacts}
            setCheckedContacts={setCheckedContacts}
          />
        </div>

      </div>

    </div>
  )
};

export default Contacts;