import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBody({ messages }) {
  const navigate = useNavigate();

  const handleExitChat = () => {
    // triggered when a user in chat clicks Exit Chat button
    navigate('/trips'); // back to user's trips page?
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
        {messages.map((message, i) => (
          <div className="message__chats" key={i}>
            <p>{message}</p>
          </div>
        ))}
        {/*Shown when a user is typing*/}
        <div className="message__status">{/* <p>Typing...</p> */}</div>
      </div>
    </>
  );
}
