import React, { useState } from 'react';
import '../CSS/AuthPages.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    specialization: '',
    bio: '',
    profilePicture: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, profilePicture: file});
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card wide">
        <div className="auth-header">
          <h1>Edit Profile</h1>
          <p className="auth-subtitle">Update your professional information</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {formData.profilePicture ? (
                <img 
                  src={URL.createObjectURL(formData.profilePicture)} 
                  alt="Profile Preview" 
                  className="profile-preview"
                />
              ) : (
                <div className="profile-placeholder">
                  <span>Add Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="institution">Institution</label>
              <input
                type="text"
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Professional Bio</label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="auth-button secondary">
              Cancel
            </button>
            <button type="submit" className="auth-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile; 