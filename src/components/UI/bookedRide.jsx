import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RideDetails = () => {
  const [rideDetails, setRideDetails] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const rideId = location.state ? location.state.rideId : null;


  console.log("Location state:", location.state);


  console.log("ride id is :" ,rideId)
  useEffect(() => {
    const fetchData = async () => {
      if (!rideId) return; // Check if rideId is truthy before fetching data
      try {
        const response = await fetch(`https://carpool-backend-079r.onrender.com/rides/booked/${rideId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ride details');
        }
        const data = await response.json();
        setRideDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

    // Cleanup function to cancel the fetch if the component unmounts before the request completes
    return () => {
      // Cleanup logic if needed
    };
  }, [rideId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!rideDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerbox">
      <h2>Ride Details</h2>
      <div className="ride-details">
        <p>Start Location: {rideDetails.ride.startLocation}</p>
        <p>End Location: {rideDetails.ride.endLocation}</p>
        <p>Date: {new Date(rideDetails.ride.date).toLocaleDateString()}</p>
        <p>Time: {rideDetails.ride.time}</p>
        <p>Seats Available: {rideDetails.ride.seatsAvailable}</p>
        <p>Phone Number: {rideDetails.ride.phoneNumber}</p>
        <p>Car Name: {rideDetails.ride.carName}</p>
        <p>Price: {rideDetails.ride.price}</p>
        <p>Payment Method: {rideDetails.paymentMethod}</p>
      </div>
      <style jsx>{`
        .containerbox {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 90%;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .ride-details {
          background-color: #ffffff;
          padding: 20px;
         
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
         
        }

        .ride-details p {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default RideDetails;
