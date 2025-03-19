import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useTrip } from '../context/TripContext';
import CreateTrip from "./CreateTrip"; // ✅ Import CreateTrip

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Trips');
  const { trips, setTrips } = useTrip(); // ✅ Added setTrips to update state

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: ""
  });  
  
  const [editProfile, setEditProfile] = useState(false);
  const token = localStorage.getItem("token");

  // State for Edit Trip Modal
  const [editTrip, setEditTrip] = useState(null);
  const [updatedTrip, setUpdatedTrip] = useState({
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
    details: ""
  });  
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data); // ✅ Update profile state
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  // Fetch User's Created Trips
  useEffect(() => {
    const fetchTrips = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:5000/api/trips/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrips(response.data?.trips || []);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setTrips([]);
      }
    };
    fetchTrips();
  }, [token, setTrips]);

  // Delete Trip Handler
  const handleDelete = async (tripId) => {
    try {
      console.log("Deleting trip with ID:", tripId);
  
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        return;
      }
  
      alert("Trip deleted successfully!");
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));
  
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };     

  // Open Edit Modal & Set Current Trip
  const handleEditClick = (trip) => {
    setEditTrip(trip._id);
    setUpdatedTrip({
      source: trip.source || "",       // Ensure it has a default value
      destination: trip.destination || "",
      startDate: trip.startDate || "",
      endDate: trip.endDate || "",
      details: trip.details || ""
    });
  };  

  // Handle Input Changes
  const handleChange = (e) => {
    setUpdatedTrip({ ...updatedTrip, [e.target.name]: e.target.value });
  };

  // Submit Updated Trip
  const handleUpdateTrip = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/trips/update/${editTrip}`,
        updatedTrip,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTrips(trips.map(trip => (trip._id === editTrip ? response.data.trip : trip)));
      setEditTrip(null);
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/users/updateProfile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }

        const data = await response.json();

        // Update the local state with the new profile data
        setProfileData(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
        
        setTimeout(() => fetchUserProfile(), 500); 

        alert("Profile updated successfully!");
        setEditProfile(false); // Close the modal
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
    }
};    

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <img src="./images/bannerrr.jpg" alt="Banner" className="banner-image" />
      </div>

      <div className="profile-container">

      {editProfile && (
  <div className="modal">
    <div className="modal-content">
      <h3>Edit Profile</h3>
      <input
  type="text"
  name="name"
  placeholder='User Name'
  value={profileData.name}  // ✅ Avoid undefined
  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
/>
<input
  type="email"
  name="email"
  placeholder='Email'
  value={profileData.email}  // ✅ Avoid undefined
  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
/>
<textarea
  name="bio"
  placeholder='Bio'
  value={profileData.bio}  // ✅ Avoid undefined
  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
/>
      <button onClick={handleUpdateProfile}>Save</button>
      <button onClick={() => setEditProfile(false)}>Cancel</button>
    </div>
  </div>
)}

        {/* Sidebar */}
        <div className="profile-sidebar">
          <img src="./images/woman.png" alt="Profile" className="profile-pic" /><br /><br />
          <h2>{profileData.name || "User Name"}</h2>
                <br />
                <p>{profileData.bio || "Travel Enthusiast"}</p>
                <p>Email: {profileData.email || "email@example.com"}</p>
                <p>Joined: {profileData.joined || "March 2024"}</p>
          <button className="profile-btn" onClick={() => setEditProfile(true)}>
          Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="profile-tabs">
            <button className={activeTab === 'Trips' ? 'active-tab' : ''} onClick={() => setActiveTab('Trips')}>
              Trips
            </button>
            <button className={activeTab === 'Photos' ? 'active-tab' : ''} onClick={() => setActiveTab('Photos')}>
              Photos
            </button>
            <button className={activeTab === 'Reviews' ? 'active-tab' : ''} onClick={() => setActiveTab('Reviews')}>
              Reviews
            </button>
          </div>

          {/* Tabs Content */}
          {activeTab === 'Trips' && (
            <div>
              <div className="trip-card">
                <h3>Vizag Trip</h3><br/>
                <p> 15th March 2025</p>
                <p>Beachside fun, parties, and water sports.</p>
              </div>
              <br/>
              <div className="trip-card">
                <h3>Assam Adventure</h3><br/>
                <p> 20th April 2025</p>
                <p>Trekking, skiing, and mountain views.</p>
              </div>
            </div>
          )}

          {activeTab === 'Photos' && (
            <div className="photo-gallery">
              <div className="gallery-item">
                <img src="./images/vizag.jpg" alt="Vizag" className="gallery-photo" />
                <p>Vizag</p>
              </div>
              <div className="gallery-item">
                <img src="./images/assam.jpg" alt="Assam" className="gallery-photo" />
                <p>Assam</p>
              </div>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="reviews-section">
              <h3>Reviews</h3><br/>
              <div className="review">
                <p><strong>Aarav:</strong> Had an amazing trip with Bindu! 🌟🌟🌟🌟</p>
              </div>
              <div className="review">
                <p><strong>Sneha:</strong> Super fun and well organized. Would travel again!</p>
              </div>
              <div className="review">
                <p><strong>Rohan:</strong> Great company on our mountain adventure!</p>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Trips Created Section - Correct Placement */}
        <div className="profile-widget">
          <h3>Trips Created</h3><br />
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div key={trip._id} className="created-trip">
                <p><strong>From:</strong> <span>{trip.source}</span></p>
                <p><strong>To:</strong> <span>{trip.destination}</span></p><br/>
                <p> {trip.startDate} to {trip.endDate}</p><br/>
                <p>{trip.details}</p><br/>
                <button className="edit-btn" onClick={() => handleEditClick(trip)}> Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(trip._id)}> Delete</button>
              </div>
            ))
          ) : (
            <p>No trips created yet.</p>
          )}
        </div>

        {/* Edit Trip Modal */}
        {editTrip && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Trip</h3>
              <input type="text" name="source" value={updatedTrip.source} onChange={handleChange} placeholder="Source" />
              <input type="text" name="destination" value={updatedTrip.destination} onChange={handleChange} placeholder="Destination" />
              <input type="date" name="startDate" value={updatedTrip.startDate} onChange={handleChange} />
              <input type="date" name="endDate" value={updatedTrip.endDate} onChange={handleChange} />
              <textarea name="details" value={updatedTrip.details} onChange={handleChange} placeholder="Trip Details"></textarea>
              <button onClick={handleUpdateTrip}>Update Trip</button>
              <button onClick={() => setEditTrip(null)}>Cancel</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
