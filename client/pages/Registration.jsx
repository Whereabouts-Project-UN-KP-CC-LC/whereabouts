import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { Button } from '@mui/material';


function Registration({ userInfo, setUserInfo }) {
    const [passMatch, setPassMatch ] = useState(true);
    const [subStatus, setSubStatus] = useState({
        sent: false,
        message: ''
    });

    // conditional alert
    const mismatchAlert = passMatch ? '' : 'Passwords do not match';
<<<<<<< HEAD:client/pages/Registration.jsx
    //const subFailedAlert = subStatus ? '' : 'Submission failed. Please try again.';
=======
    const subFailedAlert = (!subStatus.sent) ? '' : subStatus.message;
>>>>>>> 193c6c4 (Updated Registration component to dynamically render error/success messages upon user submission. Updated whereabouts controller to respond with '409' status (conflict error code) when user attempts to make a submission with a phone number that already exists in the database.):client/components/Registration.jsx

 

    // updates state as user inputs form info
    const onChange = (event) => {
        setUserInfo( (prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    // confirms first password entry & second password entry match
    const confirmMatch = (event) => {
        if (event.target.value === userInfo.password) {
            setPassMatch(true)
            console.log('passwords match');
        } else {
            setPassMatch(false);
            console.log('passwords do not match');
        };
    }

    /* 
      Sends user data to backend, redirects to contacts page if successful. 
      If not, alerts user of failure. 
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submitting user data');

        // new before charlie's PR
        if (!passMatch) {
            setSubStatus( (prevState) => {
                return ({
                    ...prevState,
                    status: false,
                    message: 'Passwords do not match. Please correct before submitting'
                })
            })

            return;
        }

        try {
        // need to confirm use of redirect & url
            console.log('userInfo being sent to BE =>', userInfo);
<<<<<<< HEAD:client/pages/Registration.jsx
            
            let response = await axios.post('/api/register', userInfo); 
            response = JSON.parse(response);
=======
            const response = await axios.post('/api/register', userInfo); 
            console.log('response from POST req =>', response);
>>>>>>> 369c2ad (Registration POST request bug fixed. New users with unique phone numbers can now be added to DB.):client/components/Registration.jsx
            
            if(response.status === 200) {
                setSubStatus( (prevState) => {
                    return {
                        ...prevState,
                        sent: true,
                        message: 'Your account has been created'
                }
                });
                console.log('User added to DB');
                return redirect('/dashboard') 
            } else {
                throw new Error();
            }
        } catch(err) {
        // render user alert that submission failed
            // console.log('this is the response', response);
            console.log('this is the error =>', err.response.data.error);
            setSubStatus((prevState) => {
                return {
                    ...prevState,
                    sent: true,
                    message: err.response.data.error,
                };
            });
       }

    }

    return (
        <div className='registration-container'>
            <h3>Registration</h3>
            <br></br>
            <form className='registration-form' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <p>Full Name</p>
                    <br></br>
                    <input 
                        type='text' 
                        className='input-box' 
                        name='name'
                        id='name'
                        required={true}
                        onChange={onChange} 
                    />
                </div>
                <br></br>
                <div className='input-container'>
                    <p>Phone Number</p>
                    <br></br>
                    <input 
                        type='text' 
                        className='input-box' 
                        name='phone_number'
                        id='phone'
                        required={true}
                        onChange={onChange} 
                    />
                </div>
                <br></br>
                <div className='input-container'>
                    <p>Password</p>
                    <br></br>
                    <input 
                        type='text' 
                        className='input-box' 
                        name='password' 
                        id='password' 
                        required={true}
                        onChange={onChange} 
                    />
                </div>
                <br></br>
                <div className="input-container">
                    <p>Re-Enter Password</p>
                    <br></br>
                    <input 
                            type='text' 
                            className='input-box' 
                            name='password'
                            id='confirm-password'
                            required={true}
                            onChange={confirmMatch} 
                        />
                    <p>{mismatchAlert}</p>
                </div>
                <br></br>
                <Button type='submit' className='styleMe' variant='contained'>Create Your Account</Button>
            </form>
            <br></br>
            <p>{subStatus.message}</p>
        </div>
        
    )

};


export default Registration;