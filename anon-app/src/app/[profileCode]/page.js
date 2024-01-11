// pages/[profileCode]/index.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";

const UserProfile = async () => {
  const router = useRouter();
  const pathname = usePathname();
  const [newMessage, setNewMessage] = useState("");

  console.log("Current pathname:", pathname);

  const handleSendMessage = async () => {
    try {
      // Implement logic to send messages to the user with profileCode
      await axios.post(`http://localhost:5000/send-message${pathname}`, {
        text: newMessage,
      });

      // Handle success or redirect as needed
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message", error);
      // Handle error or redirect as needed
    }
  };

  const sendMessageURL = `http://localhost:5000/send-message${pathname}`;
  console.log("Sending message to:", sendMessageURL);

  // Now make the request
  await axios.post(sendMessageURL, {
    text: newMessage,
  });

  return (
    <div>
      <h1>Anonymous Messaging App</h1>
      {pathname && (
        <>
          <h2>Send Message to User</h2>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </>
      )}
      {/* Include the rest of your UserProfile component content */}
    </div>
  );
};

export default UserProfile;
