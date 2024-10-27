import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminAuth from '../../customHooks/VerifyTokenofAdmin';
import useHotelAuth from '../../customHooks/VerifyToken';

const AdminDashboard = () => {
  const admin = useAdminAuth(); // Call the custom hook to check authentication
  const hotel = useHotelAuth();
  const navigate = useNavigate();

  // Check if the admin is not authenticated
  

  if (!hotel) {
    return null;
  }

  if (!admin) {
    return null; 
  }

  

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard page</h1>
    </div>
  );
};

export default AdminDashboard;
