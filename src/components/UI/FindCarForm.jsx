import React, { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import FetchSuggestions from '../mapservices/FetchSuggestions';
// import FetchToken from "../mapservices/FetchToken";
import { useNavigate } from "react-router-dom"; 
import AvailableRidesPage from "../../pages/AvailableRidesPage";



const FindCarForm = () => {
  const [to, setTo] = useState('');
  const [destination, setDestination] = useState('');
  const [showToSuggestions, setShowToSuggestions] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(true);
  const [showAvailableRides, setShowAvailableRides] = useState(false); // State to toggle between search form and available rides
  const navigate = useNavigate();

  const handleSuggestionSelect = (selectedSuggestion, field) => {
    if (field === 'to') {
      setTo(selectedSuggestion.placeName);
      setShowToSuggestions(false);
    } else if (field === 'destination') {
      setDestination(selectedSuggestion.placeName);
      setShowDestinationSuggestions(false);
    }
  };

  const handleFindRide = async () => {
    if (!to || !destination || !date || !time) {
      return;
    }
    setShowAvailableRides(true); // Show available rides
  };

  return (
    <div>
      {!showAvailableRides && (
        <Form className="form">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="search-bar-container">
              <input 
                type="text" 
                className="search-bar" 
                value={to} 
                onChange={e => {
                  setTo(e.target.value);
                  setShowToSuggestions(true);
                }} 
                placeholder="From" 
                required 
              />
              {showToSuggestions && to && <FetchSuggestions query={to} region="IND" onSelect={(suggestion) => handleSuggestionSelect(suggestion, 'to')} />}
            </div>
    
            <div className="search-bar-container">
              <input 
                type="text" 
                className="search-bar" 
                value={destination} 
                onChange={e => {
                  setDestination(e.target.value);
                  setShowDestinationSuggestions(true);
                }} 
                placeholder="Destination" 
                required 
              />
              {showDestinationSuggestions && destination && <FetchSuggestions query={destination} region="IND" onSelect={(suggestion) => handleSuggestionSelect(suggestion, 'destination')} />}
            </div>
    
            <FormGroup className="form__group">
              <input 
                type="date" 
                placeholder="Journey date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                min={new Date().toISOString().split('T')[0]}
                max={new Date(new Date().setDate(new Date().getDate() + 6)).toISOString().split('T')[0]}
                required 
              />
            </FormGroup>
    
            <FormGroup className="form__group">
              <input
                className="journey__time"
                type="time"
                placeholder="Journey time"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
              />
            </FormGroup>
    
            <FormGroup className="form__group">
              <button className="btn find__car-btn" onClick={handleFindRide}>Find Ride</button>
            </FormGroup>
          </div>
        </Form>
      )}
      
      {showAvailableRides && <AvailableRidesPage to={to} destination={destination} />}
    </div>
  );
};

export default FindCarForm;