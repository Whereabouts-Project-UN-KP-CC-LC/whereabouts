import React from 'react'
import MyTripCard from './MyTripCard'
import MyTripStart from './MyTripStart'

const MyTrip = (props) => {
    console.log(props);

  // if there is an active userTrip, render the MyTripCard component. If not, render the MyTripStart component
  // may want to add a 3rd case => if user has sent SOS, redirect to chat
  if (props.userTrip.active) {
      return (
        <MyTripCard userInfo={props.userInfo} setUserInfo={props.setUserInfo} userTrip={props.userTrip} setUserTrip={props.setUserTrip}/>
    )
  }
  return (
    <MyTripStart userInfo={props.userInfo} setUserInfo={props.setUserInfo} tripInfo={props.tripInfo} setTripInfo={props.setTripInfo}/>
  )
}

export default MyTrip
