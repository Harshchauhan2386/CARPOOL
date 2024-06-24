import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PublishRidePage from './PublishRide';

const DriverPanel = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: ''
  });

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleCreateRideClick = () => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    localStorage.setItem('userId', userId);
    
    // Navigate to the PublishRidePage component
    navigate('/publish-ride', {state: {userId}});
  };
  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://carpool-backend-079r.onrender.com/auth/driver/signup', signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setShowLoginForm(true); // Show login form after successful signup
      // Save login information to local storage
      localStorage.setItem('isLoggedIn', true);
    } catch (error) {
      console.error('Error signing up:', error.response.data);
      // Show error message
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://carpool-backend-079r.onrender.com/auth/driver/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      // Set user's name in state
      setUserName(response.data.username);
      // Set userId in localStorage for further use
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('username', response.data.username);
      // Redirect or show success message
      setIsLoggedIn(true);
      // Save login information to local storage
      localStorage.setItem('isLoggedIn', true);
      alert(`Logged in as: ${response.data.username}`);
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      // Show error message
    }
  };

  const handleLogout = () => {
    // Clear login information from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  // Check if user is already logged in
  if (isLoggedIn) {
    return (
        <div className="container">
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-auto">
                <div className="user-info mt-2 me-3">
                  Logged in as: {userName}
                </div>
              </div>
              <div className="col-auto">
                <button className="btn btn-danger mt-2" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
  
          <div className="mt-4 p-4 bg-white shadow">
            <h2>Driver Panel</h2>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary btn-lg" onClick={handleCreateRideClick}>Create Ride</button>
              <button className="btn btn-primary btn-lg" onClick={handleNotificationsClick}>Notifications</button>
              <button className="btn btn-danger btn-lg">Delete Ride</button>
            </div>
          </div>
          {/* Add ride creation and management interface here */}
        </div>
      );
    }
  
    return (
      <div className="container">
        
        <h2 className="mt-4">Driver Panel</h2>
        <div className="mb-3">
          <button className="btn btn-primary me-2" onClick={handleToggleForm}>
            {showLoginForm ? 'Signup' : 'Login'}
          </button>
        </div>
        <div className="row">
          {showLoginForm ? (
            <div className="col-md-6">
              <h3>Login</h3>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="phoneNumber" placeholder="Phone Number" value={loginData.phoneNumber} onChange={handleLoginChange} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          ) : (
            <div className="col-md-6">
              <h3>Signup</h3>
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="fullName" placeholder="Full Name" value={signupData.fullName} onChange={handleSignupChange} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" name="phoneNumber" placeholder="Phone Number" value={signupData.phoneNumber} onChange={handleSignupChange} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleSignupChange} />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
              </form>
            </div>
          )}
        </div>
        {/* Add ride creation and management interface here */}
      </div>
    );
  };
  
  export default DriverPanel;