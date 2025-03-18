import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      if (!token) return; // Ensure user is logged in

      try {
        const response = await axios.get("http://localhost:5000/api/trips/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(response.data); // Assuming backend returns an array of trips
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [token]);

  // Add a new trip to state
  const addTrip = (trip) => {
    setTrips((prevTrips) => [...prevTrips, trip]);
  };

  return (
    <TripContext.Provider value={{ trips, setTrips, addTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
