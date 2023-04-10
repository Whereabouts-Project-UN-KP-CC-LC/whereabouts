import React from 'react';

export default function ChatNamespace() {
  return (
    <div className="chat">
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </div>
  );
}
