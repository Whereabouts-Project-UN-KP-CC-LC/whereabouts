import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import io from 'socket.io-client';

// to auto-scroll to latest chat message
// creates a new Manager for the given host URL (https://socket.io/docs/v4/client-api/#manager)
const socket = io.connect('http://localhost:8080/', {
  // path: '/chat',
});

export default function ChatPage({ userInfo }) {
  const lastMsgRef = useRef(null);
  // use useEffect to scroll to bottom of chat every time messages updates
  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // on update of messages, move scroll bar to bottom

  const [name, setName] = useState(userInfo.name);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]); // have messages state here and NOT on ChatBody b/c socket was not passed down to ChatBody

  useEffect(() => {
    // if user registered, don't need to fetch their name from DB
    // if user logged in, will need to fetch their name from DB (it's an empty string on userInfo)
    if (!userInfo.name) {
      const user_name = axios
        .get(`api/users/${userInfo.phone_number}`)
        .then((res) => res[0].name)
        .catch((err) => {
          console.log(err);
        });
      setName(user_name);
    }
    // listens for connecting client
    socket.on('connect', () => {
      console.log('client side connected!');
      setIsConnected(true);
    });
    // listens for disconnecting client
    socket.on('disconnect', () => {
      console.log('client side disconnected!');
      setIsConnected(false);
    });
    // acts as a onComponentUnmount?
    return () => {
      socket.close();
    };
  }, []); // no dependencies = useEffect will only run on component mount

  if (isConnected) {
    // listens for socket server's first msg event
    socket.on('autoMsg', (msg) => {
      // msg contains text only
      setMessages([
        ...messages,
        {
          name,
          date_time:
            new Date().toDateString() +
            ' ' +
            new Date().toLocaleTimeString('en-US'),
          text: msg,
        },
      ]);
    });
    // listens for socket server's disperseMsg event
    socket.on('disperseMsg', (msgObj) => {
      setMessages([...messages, msgObj]); // msgObj contains user's name, date_time, and typed text
    });
  }

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} lastMsgRef={lastMsgRef} />
        {/* passing down messages to ChatBody to display */}
        <ChatFooter socket={socket} userInfo={userInfo} />
      </div>
    </div>
  );
}
