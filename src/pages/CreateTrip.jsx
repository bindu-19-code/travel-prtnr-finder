import React, { useState } from "react";
import { useTrip } from "../context/TripContext";
import "../App.css";

const recommendations = [
  { 
    name: "Nadia Lee", 
    place: "Switzerland",
    description: "In Switzerland, enjoy skiing, hiking, sightseeing, cruising, and paragliding!", 
    profilePic: "./images/bindu.png", 
    mainImage: "./images/img5.jpg" 
  },
  { 
    name: "Alex", 
    place: "Italy",
    description: "In Italy, indulge in delicious cuisine, explore ancient history, admire world-class art!", 
    profilePic: "./images/alex.png", 
    mainImage: "./images/travel5.jpg" 
  },
  { 
    name: "Jayson Cabrillos", 
    place: "Ladakh",
    description: "Explore Ladakh with mountain biking, river rafting, stargazing, and trekking!", 
    profilePic: "./images/bob.png", 
    mainImage: "./images/img3.jpg" 
  },
  { 
    name: "Joy", 
    place: "London",
    description: "Discover London through iconic landmarks, river cruises, theater shows, and historic museums!", 
    profilePic: "./images/joy.png", 
    mainImage: "./images/travel4.jpg" 
  },
];

const CreateTrip = () => {
  const { addTrip } = useTrip(); // ✅ Get addTrip from context
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState(""); // ✅ Define message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before API call

    try {
      const response = await fetch("http://localhost:5000/api/trips/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ source, destination, startDate, endDate, details }),
      });

      if (!response.ok) {
        throw new Error("Failed to create trip");
      }

      const tripData = await response.json();
      addTrip((prevTrips) => [...prevTrips, tripData]); // ✅ Append new trip
      setMessage("Trip created successfully!"); // ✅ Show success message

      // Clear form fields after successful submission
      setSource("");
      setDestination("");
      setStartDate("");
      setEndDate("");
      setDetails("");

    } catch (error) {
      console.error("Trip creation error:", error);
      setMessage("Failed to create trip. Try again!"); // ✅ Show error message
    }
  };

  return (
    <div className="create-trip-page">
      
      {/* Form Section */}
      <div className="form-section">
        <h1>Create Your Trip</h1><br/>
        {message && <p className="message">{message}</p>}
        <form className="trip-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} required />
          <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          <textarea placeholder="Trip Details" rows="4" value={details} onChange={(e) => setDetails(e.target.value)} required></textarea>
          <button type="submit">Create Trip</button>
        </form>
      </div>

      {/* People You Can Go With Section */}
      <div className="recommendations-section">
        <h1>People You Can Go With</h1>
        <div className="recommendations-grid">
          {recommendations.map((person, index) => (
            <div className="recommendation-card" key={index}>
              <img src={person.mainImage} alt="Trip" className="trip-image" />
              <h2 className="place">{person.place}</h2>
              <p className="description">{person.description}</p>
              <div className="profile-info">
                <img src={person.profilePic} alt={person.name} className="profile-icon" />
                <span className="profile-name">{person.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CreateTrip;
