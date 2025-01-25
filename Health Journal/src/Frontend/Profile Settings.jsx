import React, { useState } from "react";

function ProfileSettings() {
  const [profilePic, setProfilePic] = useState(null);

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Set the uploaded picture as base64 URL
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <div className="profile-pic-container">
        <label htmlFor="profile-pic-upload">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="profile-pic"
              width={100}
              height={100}
            />
          ) : (
            <div className="default-pic">+</div>
          )}
        </label>
        <input
          type="file"
          id="profile-pic-upload"
          accept="image/*"
          onChange={handleProfilePicChange}
          style={{ display: "none" }}
        />
      </div>

      {/* You can add more profile settings options here */}
      <div className="profile-info">
        <label>Username</label>
        <input type="text" placeholder="Enter your username" />
      </div>
    </div>
  );
}

export default ProfileSettings;
