// src/components/ChatBot.jsx
import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message) return;

    addMessage('user', message);
    setInput('');

    try {
const response = await fetch('chatbotusinggeminillm.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      addMessage('bot', data.reply);
    } catch (error) {
      console.error('Error:', error);
      addMessage('bot', "Sorry, I couldn't connect to the server.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div id="chat-container">
      <div id="chat-log">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'user' ? 'You' : 'Bot'}: {msg.text}
          </div>
        ))}
      </div>
      <div id="input-container">
        <input
          type="text"
          id="user-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          autoComplete="off"
        />
        <button id="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
