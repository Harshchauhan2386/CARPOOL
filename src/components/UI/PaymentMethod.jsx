import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RideDetails from './bookedRide';

const PaymentMethod = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { ride } = location.state;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleReserveClick = async (event) => {
    event.preventDefault(); 
    try {
      if (!selectedOption) {
        window.alert("Please select a payment method.");
        return;
      }
      
      // Log the rideId before making the axios request
      console.log("Ride ID:", ride._id);
  
      const response = await axios.post('https://carpool-backend-079r.onrender.com/rides/book', {
        rideId: ride._id,
        paymentMethod: selectedOption
      });
      
      if (response.status === 201) {
        window.alert("Ride booked successfully!");
        console.log("Ride object:", ride);
        console.log("irde id in payment ", ride._Id);
        navigate('/ride-details', { state: { rideId: ride._id } }); // Pass rideId instead of ride._Id
      } else {
        window.alert("Failed to book ride. Please try again later.");
      }
      
    } catch (error) {
      console.error('Error booking ride:', error.response ? error.response.data : error.message);
      window.alert("Failed to book ride. Please try again later.");
    }
  };

  return (
    <div className="containerbox">
      <div className="payment-gateway">
        <div className="ride-details">
          <h3>Ride Details</h3>
          <p><strong>Start Location:</strong> {ride.startLocation}</p>
          <p><strong>End Location:</strong> {ride.endLocation}</p>
          <p><strong>Price:</strong> {ride.price}</p>
          <p><strong>Car Name:</strong> {ride.carName}</p>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="upi"
            name="paymentOption"
            value="UPI Payment"
            checked={selectedOption === "UPI Payment"}
            onChange={handleOptionChange}
          />
          <label htmlFor="upi">UPI Payment</label>
        </div>

        <div className="payment-option">
          <input
            type="radio"
            id="masterCard"
            name="paymentOption"
            value="Debit/Credit Card"
            checked={selectedOption === "Debit/Credit Card"}
            onChange={handleOptionChange}
          />
          <label htmlFor="masterCard">Debit/Credit Card</label>
        </div>

        <div className="payment-option">
          <input
            type="radio"
            id="cash"
            name="paymentOption"
            value="Cash"
            checked={selectedOption === "Cash"}
            onChange={handleOptionChange}
          />
          <label htmlFor="cash">Cash</label>
        </div>
      </div>

      <div className="reserve-button">
        <button onClick={(event)=>handleReserveClick(event)} disabled={!selectedOption}>
          Confirm
        </button>
      </div>
      <style jsx>{`

.containerbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

        .payment-gateway {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .ride-details {
          background-color: #f9f9f9; /* Light grey background */
          border: 1px solid #ddd; /* Light grey border */
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        
        .ride-details h3 {
          color: #333; /* Dark grey color for the heading */
          margin-bottom: 10px;
        }
        
        .ride-details p {
          color: #555; /* Medium grey color for the text */
          margin: 5px 0;
        }
        
        .ride-details strong {
          color: #000; /* Black color for strong text */
        }


        .payment-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .payment-option:hover {
          background-color: #f5f5f5;
          border-radius: 0.5rem;
        }

        .payment-option input[type="radio"] {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 1px solid #ccc;
          background-color: #fff;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          outline: none;
        }

        .payment-option input[type="radio"]:checked {
          background-color: #007bff;
          border-color: #007bff;
        }

        // .payment-option input[type="radio"]:checked::after {
        //   content: "";
        //   display: block;
        //   width: 1rem;
        //   height: 1rem;
        //   border-radius: 50%;
        //   background-color: #fff;
        //   position: absolute;
        //   top: 50%;
        //   left: 50%;
        //   transform: translate(-50%, -50%);
        // }

        .payment-option label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
        }

        .payment-option img {
          width: 100px;
          height: auto;
        }

        .reserve-button {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reserve-button button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: bold;
          transition: all 0.2s ease-in-out;
          outline: none;
        }

        .reserve-button button:hover {
          background-color: #0069d9;
        }

        .reserve-button button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default PaymentMethod;
