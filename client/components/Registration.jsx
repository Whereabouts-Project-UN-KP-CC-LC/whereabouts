import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';


function Registration({ userInfo, setUserInfo }) {
    const [passMatch, setPassMatch ] = useState(true);
    const [subStatus, setSubStatus] = useState(true);

    // conditional alerts
    const mismatchAlert = passMatch ? '' : 'Passwords do not match';
    const subFailedAlert = subStatus ? '' : 'Submission failed. Please try again.';

 

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

        try {
        // need to confirm use of redirect & url
            console.log('userInfo being sent to BE =>', userInfo);
            const response = await axios.post('/api/register', userInfo); 
            console.log('response from POST req =>', response);
            
            if(response.status === 200) {
                setSubStatus(true);
                console.log('User added to DB');
                redirect('/dashboard') 
            } else {
                throw new Error();
            }
        } catch(err) {
        // render user alert that submission failed
            console.log(err.message);
            setSubStatus(false);
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
                <button type='submit' className='styleMe'>Create Your Account</button>
            </form>
            <br></br>
            <p>{subFailedAlert}</p>
        </div>
        
    )

};


export default Registration;