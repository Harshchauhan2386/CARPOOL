import React, { useState } from 'react';
import '../styles/PublishRidePage.css';

const PublishRidePage = ({userName}) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [carName, setCarName] = useState('');
  const [price, setPrice] = useState('');

  const userId = localStorage.getItem('userId'); 
  console.log(userId);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Retrieve userId from localStorage
   
    // Create a data object with the form fields
    const formData = {
      startLocation,
      endLocation,
      date,
      time,
      seatsAvailable,
      phoneNumber,
      carName,
      price,
      userId // Include userId in formData
    };
  
    try {
      // Make a POST request to your backend API endpoint
      const response = await fetch('https://carpool-backend-079r.onrender.com/rides/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Reset the form fields after successful submission
        setStartLocation('');
        setEndLocation('');
        setDate('');
        setTime('');
        setSeatsAvailable('');
        setPhoneNumber('');
        setCarName('');
        setPrice('');
        
        // alert('userId: ', userId);
        alert('Ride published successfully!');
      } else {
        // Handle error response from the server
        const errorMessage = await response.text();
        alert(`Failed to publish ride: ${errorMessage}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error publishing ride:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;
    // Only allow numbers and limit to a maximum length of 10 characters
    const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(sanitizedValue);
  };

  return (
    <div className="publish-ride-page">
      <div className="publish-ride-form">
        <h1>Publish Ride</h1>
        <h2>Welcome,{localStorage.getItem('username')}!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="start-location">Start Location:</label>
            <input
              type="text"
              id="start-location"
              value={startLocation}
              onChange={(event) => setStartLocation(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-location">End Location:</label>
            <input
              type="text"
              id="end-location"
              value={endLocation}
              onChange={(event) => setEndLocation(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(new Date().setDate(new Date().getDate() + 6)).toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="journey-time">Journey Time:</label>
            <input
              className="journey__time"
              type="time"
              placeholder="Journey time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="seats-available">Seats Available:</label>
            <input
              type="number"
              id="seats-available"
              value={seatsAvailable}
              onChange={(event) => setSeatsAvailable(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input
              type="text"
              id="phone-number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="form-group">
          <label htmlFor="car-name">Car Name:</label>
            <input
              type="text"
              id="car-name"
              value={carName}
              onChange={(event) => setCarName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <button type="submit" className="publish-ride-button">
            Publish Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishRidePage;
