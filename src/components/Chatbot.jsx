import React, { useRef, useState } from 'react';
import './Chatbot.css';
import chatbot_icon from '../assets/chatbot_icon.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hey there 👋 I'm your SpaceBot!" }
  ]);
  const apiKey = import.meta.env.VITE_GEMINI_KEY;
//   const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const handleSend = async () => {
    const userInput = inputRef.current.value;
    if (!userInput.trim()) return;

    const userMsg = { type: 'user', text: userInput };
    setMessages(prev => [...prev, userMsg]);

    const botResponse = await getAIResponse(userInput); //function to get response from gemini

    setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    inputRef.current.value = '';
  };

  const getAIResponse = async (message) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{parts: [{text: message}]}],
        })
      });
      const chatRes = await response.json();

      const msg =  chatRes?.candidates?.[0]?.content?.parts?.[0]?.text;
      return msg;
  };

  return (
    <>
    <div className="chatbot-container">
        {console.log("hello chatbot")}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span><img src={chatbot_icon}/> SpaceBot</span>
            <button onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
            //   value={input}
            ref={inputRef}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={()=> handleSend()}>Send</button>
          </div>
        </div>
      )}

      {/* Floating Icon */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img src={chatbot_icon} alt="" />
        </button>
    </div>
    </>
  );
};

export default Chatbot;
