import React, { useEffect, useContext } from "react";
import { CartContext } from "./CartContext";
import "./Profile.css";

function Profile() {
  const { profile, profileLoading, profileError, fetchProfile } = useContext(CartContext);

  useEffect(() => {
    fetchProfile(); // fetch profile when component mounts
  }, []);

  if (profileLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (profileError) return <p style={{ textAlign: "center", color: "red" }}>{profileError}</p>;

  if (!profile) return null;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
        <p><strong>Address:</strong> {profile.address || "N/A"}</p>
        <p><strong>User Type:</strong> {profile.userType}</p>
      </div>
    </div>
  );
}

export default React.memo(Profile);
