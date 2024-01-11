// Profile.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SendMessage from "@/app/[profileCode]/page";

const Profile = () => {
  // const router = useRouter();
  // const { profileLink } = router.query;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if no token is found
          router.push("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/profile/${profileLink}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // If the profile belongs to the logged-in user, handle it accordingly
        if (response.data && response.data.isOwnProfile) {
          // Redirect to a different page or handle it as needed
          router.push(`/dashboard`);
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
        // Redirect to an error page or handle it as needed
        router.push("/error");
      }
    };

    if (profileLink) {
      fetchUserProfile();
    }
  });

  return (
    <div>
      <h1>Profile</h1>
      <SendMessage />
    </div>
  );
};

export default Profile;
