import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ProfileSettings.css";
const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    profilePic: null,
  });
  const [preview, setPreview] = useState(null); 
  const [notification, setNotification] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, profilePic: file });
        setPreview(URL.createObjectURL(file)); 
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.address) {
      alert("All fields are required.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setNotification("Profile Updated Successfully!");
      setIsSubmitting(false);
      setTimeout(() => {
        setNotification(""); 
        navigate("/dashboard"); 
      }, 2000);
    }, 1000);
  };
  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {notification && (
        <div className="notification">
          {notification}
          <button className="ok-button" onClick={() => setNotification("")}>
            OK
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />
          {preview && <img src={preview} alt="Preview" className="profile-preview" />}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};
export default ProfileEdit;
