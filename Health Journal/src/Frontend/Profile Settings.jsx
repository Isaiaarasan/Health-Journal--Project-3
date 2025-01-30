import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import "../CSS/ProfileSettings.css";

const ProfileEdit = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    profilePic: null,
  });

  const [notification, setNotification] = useState(""); // To manage success notification
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable submit during submission

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({
        ...formData,
        profilePic: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    // Simulate form submission (you can replace this with actual form submission logic)
    setTimeout(() => {
      // Profile update logic goes here

      // Show success notification
      setNotification("Profile Updated Successfully!");

      // Clear the form data
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        profilePic: null,
      });

      // Disable submitting button
      setIsSubmitting(false);

      // After 2 seconds, redirect to dashboard and hide the notification
      setTimeout(() => {
        setNotification(""); // Hide the notification
        navigate("/dashboard"); // Redirect to dashboard
      }, 2000);
    }, 1000); // Simulate a network request with a delay
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>

      {/* Success notification */}
      {notification && (
        <div className="notification">
          {notification}
          <button
            className="ok-button"
            onClick={() => navigate("/dashboard")}
          >
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
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting} // Disable submit button during submission
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
