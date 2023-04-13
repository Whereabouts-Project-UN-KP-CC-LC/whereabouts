import React, { useState } from 'react';

export default function ChatFooter({ socket, userInfo }) {
  const [message, setMessage] = useState({});

  const handleSendMsg = (e) => {
    e.preventDefault();
    // send message to server (unless empty string)
    if (message) {
      socket.emit('new msg', message); // 'new msg' = event name
      // clear input
      setMessage({
        name: '',
        date_time: '',
        text: '',
      });
    }
    // see server.js, socket.on('new msg')
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
