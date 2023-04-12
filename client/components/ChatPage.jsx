import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

export default function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]); // have messages state here and NOT on ChatBody b/c socket was not passed down to ChatBody

  useEffect(() => {
    // listens for socket server's disperse msg event
    socket.on(
      'disperse msg',
      (msg) => {
        setMessages([...messages, msg]);
      },
      [socket, messages] // dependencies array (to prevent useEffect from rerendering infinitely)?
    );
  });

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} />{' '}
        {/* passing down messages to ChatBody to display */}
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
