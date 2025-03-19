import React, { useState } from "react";
import "../App.css";

const FindPartners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [sentRequests, setSentRequests] = useState({});

  const [travelBuddies, setTravelBuddies] = useState([
    { id: 1, name: "Alice", destination: "Goa", date: "2025-04-10", details: "Exploring beaches and nightlife of Goa.", image: "./images/alex.png" },
    { id: 2, name: "Bob", destination: "Manali", date: "2025-05-15", details: "Adventure trip with trekking and paragliding.", image: "./images/bob.png" },
    { id: 3, name: "Charlie", destination: "Maldives", date: "2025-06-01", details: "Relaxing vacation with water sports.", image: "./images/joy.png" },
    { id: 4, name: "Bindu", destination: "Paris", date: "2025-09-19", details: "To visit the city of Love", image: "./images/bindu.png" },
    { id: 5, name: "Mike", destination: "London", date: "2025-08-12", details: "Exploring iconic landmarks and vibrant streets.", image: "./images/joy.png" },
    { id: 6, name: "Saara", destination: "Swizterland", date: "2025-11-25", details: "Swiss adventure exploring the Alps and scenic landscapes.", image: "./images/woman.png" },
    { id: 7, name: "Adam", destination: "Europe", date: "2025-02-19", details: "Relaxing with the view of historic cities and breathtaking landscapes.", image: "./images/alex.png" },
    { id: 8, name: "Ria", destination: "Singapore", date: "2025-12-13", details: "Exploring the Marina Bay skyline and vibrant city.", image: "./images/bob.png" },
  ]);

  const filteredBuddies = travelBuddies.filter(buddy =>
    buddy.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
  };

  const closeDetails = () => {
    setSelectedTrip(null);
  };

  const sendTravelRequest = async (receiverName, destination) => {
    const loggedInUserId = localStorage.getItem("userId"); // Replace with logged-in user ID

    console.log("Sender ID from localStorage:", loggedInUserId);
    console.log("Receiver Name:", receiverName);
    console.log("Destination:", destination);
    
    if (!loggedInUserId || !receiverName || !destination) {
      console.error("Missing required data", { loggedInUserId, receiverName, destination });
      alert("Error: Missing required fields!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/travel-requests/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: loggedInUserId,
          receiverName: receiverName, // Send only the receiverName
          destination: destination,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Error Response:", data);
        alert(data.error || "Failed to send request");
      } else {
        alert(data.message);
      }
      setSentRequests((prevRequests) => ({
        ...prevRequests,
        [receiverName]: true, // Mark request as sent for the receiver
      }));      
      setTravelBuddies((prevBuddies) => prevBuddies.filter(buddy => buddy.name !== receiverName));
    } catch (error) {
      console.error("Error sending travel request:", error);
      alert("Something went wrong");
    }
  };     

  return (
    <div className="find-partners-page">
      {/* Section heading */}
      <h1 className="section-heading">Explore Top Destinations</h1>

      {/* Search bar */}
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sliding images below search */}
      <div className="heroo-section">
  <div className="hero-image">
    <img src="./images/travel1.jpg" alt="Travel 1" />
    <div className="hero-text">
      <h1>EXPLORE TURKEY</h1>
      <p>Discover the scenic charm of Bodrum, Turkey with fellow travelers.</p>
    </div>
  </div>

  <div className="hero-image">
    <img src="./images/travel2.jpg" alt="Travel 2" />
    <div className="hero-text">
      <h1>TRAVEL TO ITALY</h1>
      <p>Wander through the timeless beauty of Venice’s iconic canals and historic charm.</p>
    </div>
  </div>

  <div className="hero-image">
    <img src="./images/travel3.jpg" alt="Travel 3" />
    <div className="hero-text">
      <h1>CANADA GETAWAY</h1>
      <p>Immerse yourself in the pristine beauty of Banff’s turquoise lakes and majestic peaks.</p>
    </div>
  </div>
</div>

      {/* Travel buddies list */}
      <div className="partners-list">
        {filteredBuddies.map((buddy) => (
          <div key={buddy.id} className="partner-card">
            <img src={buddy.image} alt="Profile" className="profile-pic" />
            <h3>{buddy.name}</h3>
            <p>Destination: {buddy.destination}</p>
            <p>Travel Date: {buddy.date}</p>

            {!sentRequests[buddy.id] && (
              <button
                className="details-btn"
                onClick={() => sendTravelRequest(buddy.name, buddy.destination)}
              >
                Send Request
              </button>
            )}

            <button
              className="details-btn"
              onClick={() => handleViewDetails(buddy)}
            >
              View Trip Details
            </button>
          </div>
        ))}
      </div>

      {/* Trip details popup */}
      {selectedTrip && (
        <div className="trip-popup">
          <div className="trip-popup-content">
            <h2>TRIP DETAILS</h2><br/>
            <p><strong>Destination:</strong> {selectedTrip.destination}</p>
            <p><strong>Date:</strong> {selectedTrip.date}</p>
            <p><strong>Details:</strong> {selectedTrip.details}</p><br/>
            <button className="close-btn" onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindPartners;
