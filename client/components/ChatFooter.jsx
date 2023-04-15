import React, { useState } from 'react';
import socket from '../index.js';

export default function ChatFooter({ userInfo }) {
  const [message, setMessage] = useState({});

  const handleSendMsg = (e) => {
    // the following prevents form from being submitted to a file
    e.preventDefault();
    // send message to server (unless message is an empty string)
    if (message.text) {
      // emitting a message to the server
      socket.emit('chatMsg', message); // 'chatMsg' = event name, message is an object containing user's name, date_time, and typed text
      // clear input
      setMessage({
        name: '',
        date_time: '',
        text: '',
      });
    }
    // see server.js, socket.on('chatMsg')
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMsg}>
        <input
          type="text"
          className="message"
          value={message.text}
          onChange={(e) =>
            setMessage({
              name: userInfo.name,
              date_time:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString('en-US'),
              text: e.target.value,
            })
          }
        />
        <button className="sendBtn">Send</button>
      </form>
    </div>
  );
}
