// pages/ViewMessages.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/messages", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcnJ5eXkiLCJpYXQiOjE3MDUwNjExOTl9.YwiExZyOB-SvN4pXcwYiOpBzVgefouhjnwZcBUm4Zkg",
          },
        });

        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">View Messages</h1>
      <ul className="list-disc pl-4">
        {messages.map((message) => (
          <li key={message._id} className="mb-2 bg-gray-100 p-2 rounded">
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMessages;
