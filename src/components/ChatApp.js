import React, { useEffect, useState } from 'react'
import './css/ChatApp.css'
const ChatApp = () => {

    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
      });
      const [inputValue, setInputValue] = useState('');
    
      useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
      }, [messages]);
    
      const handleSendMessage = () => {
        if (inputValue.trim()) {
          const newMessage = { text: inputValue, sender: 'You', time: new Date().toLocaleTimeString() };
          setMessages([...messages, newMessage]);
          setInputValue('');
    
          // Simulate bot response after 1 second
          setTimeout(() => {
            const botResponse = {
              text: `Bot: I'm just a simulated response to your message: "${inputValue}"`,
              sender: 'Bot',
              time: new Date().toLocaleTimeString(),
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
          }, 1000);
        }
      };
  return (
    <div className="chat-app">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender === 'You' ? 'user-message' : 'bot-message'}`}>
            <span>{message.time} - {message.sender}: {message.text}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatApp