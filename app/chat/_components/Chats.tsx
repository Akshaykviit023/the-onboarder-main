"use client";

import { useEffect, useState } from "react"

const Chats = () => {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
              const response = await fetch('http://127.0.0.1:8000/chatHistory', {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setChatHistory(data.history);
              console.log(data.history)
            } catch (error) {
              console.error('Failed to fetch chat history:', error);
            }
          };
      
          fetchChatHistory();
        }, [])
  return (
    <div className="mt-24 text-white">

        <h1>Chat History</h1>
        <ul>
        {chatHistory.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}

export default Chats