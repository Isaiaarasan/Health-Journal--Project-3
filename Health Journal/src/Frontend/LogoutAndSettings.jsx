import React from 'react';
import { useNavigate } from 'react-router-dom';
const LogoutAndSettings = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default LogoutAndSettings; 