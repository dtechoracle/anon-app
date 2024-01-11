// pages/dashboard.jsx
"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import axios from "axios";

const Dashboard = () => {
  //   const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if no token is found
          router.push("/login");
          return;
        }

        // Fetch user profile using the token
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: token,
          },
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Remove token from local storage and redirect to login
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleProfileLinkCopy = () => {
    // Implement logic to copy the profile link to the clipboard
    const profileLink = `http://localhost:5173/${profile.profileLink}`;
    navigator.clipboard.writeText(profileLink);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {profile && (
        <div>
          <p>Welcome, {profile.username}!</p>
          <p>
            Your profile link:{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleProfileLinkCopy}
            >{`http://localhost:5000/${profile.profileLink}`}</span>
          </p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
