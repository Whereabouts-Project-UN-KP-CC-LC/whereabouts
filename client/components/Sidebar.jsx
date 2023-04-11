import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {

    return (
        <div className='sidebar'>
            {/* <a href=''>Contacts</a>
            <a href=''>Trips</a>
            <a href=''>Logout</a> */}
            <div 
                onClick={props.setRenderContacts} 
                className='sidebar-item'
                >
                Contacts
            </div>
            <div 
                onClick={props.setRenderTrips} 
                className='sidebar-item'
                >
                Trips
            </div>
            <div 
                onClick={props.setRenderTripsImWatching} 
                className='sidebar-item'
                >
                Trips I'm Watching
            </div>
            
            <Link to='/' className='sidebar-item'>Logout</Link>
        </div>
    )
}
export default Sidebar;