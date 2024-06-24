import React from "react";
import { Routes, Route, } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarDetails from "../pages/CarDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublishRidePage from "../pages/PublishRide";
import AvailableRidesPage from "../pages/AvailableRidesPage";
import PaymentMethod from "../components/UI/PaymentMethod";
import DriverPanel from "../pages/driversection";
import RideDetails from "../components/UI/bookedRide";
// import Notifications from "../pages/drivernotification";


const Routers = () => {
  return (
    <Routes>
   
   <Route path="*" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/c/:slug" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    
      <Route path="/PublishRidePage" element={<PublishRidePage />} />
      <Route path="/driverpanel" element={<DriverPanel/>} />
      <Route path="/payment-method" element={<PaymentMethod />} />
      <Route path="/publish-ride" element={<PublishRidePage/>} />
      <Route path="/available-rides" element={<AvailableRidesPage />} />
      <Route path="/ride-details" element={<RideDetails/>}/>
      {/* <Route path="/notifications" element={<Notifications/>}/> */}
      
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};
export default Routers;
