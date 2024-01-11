// Update the logic in your Home component (index.js)
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Implement logic to fetch user details based on profileLink and handle accordingly
  }, [pathname]);

  const handleSendMessage = async () => {
    try {
      // Implement logic to send messages to the user with profileLink
      await axios.post(`http://localhost:5000/send-message/bo1i1zvpco`, {
        text: newMessage,
      });

      // Handle success or redirect as needed
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message", error);
      // Handle error or redirect as needed
    }
  };

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
      {/* Include the rest of your Home component content */}
    </div>
  );
};

export default Home;
