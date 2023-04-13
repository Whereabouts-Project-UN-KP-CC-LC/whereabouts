import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBody({ messages }) {
  const navigate = useNavigate();

  const handleExitChat = () => {
    // triggered when a user in chat clicks Exit Chat button
    navigate('/dashboard'); // back to user's trips page?
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <button className="leaveChat__btn" onClick={handleExitChat}>
          End Chat / Trip
        </button>
      </header>

      <div className="message__container">
        {messages.map((msg, i) => (
          <div className="message__chats" key={i}>
            <p>{msg.name}</p>
            <p>{msg.date_time}</p>
            <p>{msg.text}</p>
          </div>
        ))}
        {/*Shown when a user is typing*/}
        <div className="message__status">{/* <p>Typing...</p> */}</div>
      </div>
    </>
  );
}
