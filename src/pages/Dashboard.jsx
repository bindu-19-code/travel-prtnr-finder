import React, { useEffect, useState } from 'react';
import '../App.css';

const Dashboard = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([
    { id: 1, name: 'Alex', trip: 'Manali trip' },
    { id: 2, name: 'Maria', trip: 'Goa trip' },
  ]);

  const handleAccept = (id) => {
    const request = receivedRequests.find(req => req.id === id);
    alert(`Accepted ${request.name}'s request for ${request.trip}!`);
    setReceivedRequests(receivedRequests.filter(req => req.id !== id));
  };

  const handleDecline = (id) => {
    const request = receivedRequests.find(req => req.id === id);
    alert(`Declined ${request.name}'s request for ${request.trip}.`);
    setReceivedRequests(receivedRequests.filter(req => req.id !== id));
  };

    useEffect(() => {
      const fetchSentRequests = async () => {
        const loggedInUserId = localStorage.getItem("userId");
        try {
          const response = await fetch(`http://localhost:5000/api/travel-requests/sent-request/${loggedInUserId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch sent requests");
          }
          const data = await response.json();
          setSentRequests(data);
        } catch (error) {
          console.error("Error fetching sent requests:", error);
        }
      };
    
      fetchSentRequests();
    }, []);    

    const cancelRequest = async (receiverName, destination) => {
      const loggedInUserId = localStorage.getItem("userId");
      if (!loggedInUserId || !receiverName || !destination) {
        console.error("Receiver name or destination is missing.");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:5000/api/travel-requests/cancel`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({senderId: loggedInUserId,
          receiverName: receiverName,
          destination: destination,
        }),
        });
    
        if (response.ok) {
          setSentRequests((prevRequests) =>
            prevRequests.filter(req => req.receiverName !== receiverName || req.destination !== destination)
          );
          console.log("Request cancelled successfully.");
        } else {
          console.error("Failed to cancel request.");
        }
      } catch (error) {
        console.error("Error cancelling request:", error);
      }
    };
    

  return (
    <div className="dashboard-wrapper">
      {/* Left side - Dashboard content */}
      <div className="dashboard-page">
        <h1>Welcome Back, Traveler! </h1>
        <p className="dashboard-subtitle">
          Manage your travel requests and stay updated with upcoming trips.
        </p>

        <section className="dashboard-section">
          <h2> Received Requests</h2>
          <ul className="request-list">
            {receivedRequests.length > 0 ? (
              receivedRequests.map(request => (
                <li key={request.id}>
                  <strong>{request.name}</strong> wants to join your {request.trip}.
                  <div>
                    <button className="accept-btn" onClick={() => handleAccept(request.id)}>Accept</button>
                    <button className="decline-btn" onClick={() => handleDecline(request.id)}>Decline</button>
                  </div>
                </li>
              ))
            ) : (
              <li>No new requests.</li>
            )}
          </ul>
        </section>

        <section className="dashboard-section">
          <h2> Sent Requests</h2>
          <div className="request-list">
          {sentRequests.length === 0 ? (
        <p>No sent requests found</p>
      ) : (
        <ul>
          {sentRequests.map((request, index) => (
            <li key={index}>
              <pre>Sent to: {request.receiverName}                             Destination: {request.destination}</pre>
              <button className="accept-btn" onClick={() => cancelRequest(request.receiverName, request.destination)}>
              Cancel
            </button>
            </li>
          ))}
        </ul>
      )}
</div>
        </section>

        <section className="dashboard-section">
          <h2> Upcoming Trips</h2>
          <ul className="trip-list">
            <li>
              <h3>Manali Adventure</h3>
              <p> 15th March 2025 - 20th March 2025</p>
              <p> 4 Travelers |  Road Trip</p>
              <p> From Bangalore to Manali</p>
            </li>
            <li>
              <h3>Goa Beach Holiday</h3>
              <p> 5th April 2025 - 10th April 2025</p>
              <p> 6 Travelers |  Flight</p>
              <p> From Mumbai to Goa</p>
            </li>
          </ul>
        </section>

        <section className="dashboard-section">
          <h2> Your Travel Stats</h2>
          <div className="stats">
            <div>
              <h3>12</h3>
              <p>Trips Completed</p>
            </div>
            <div>
              <h3>5</h3>
              <p>Partners Found</p>
            </div>
            <div>
              <h3>3</h3>
              <p>Pending Requests</p>
            </div>
          </div>
        </section>
      </div>

      {/* Right side - Continuous vertical image scroller */}
      <div className="dashboard-scroll-images">
        <div className="scrolling-images">
          <img src="/images/img1.jpg" alt="Image 1" />
          <img src="/images/img2.jpg" alt="Image 2" />
          <img src="/images/img3.jpg" alt="Image 3" />
          <img src="/images/img4.jpg" alt="Image 4" />
          {/* Repeat images for seamless loop */}
          <img src="/images/img1.jpg" alt="Image 1" />
          <img src="/images/img2.jpg" alt="Image 2" />
          <img src="/images/img3.jpg" alt="Image 3" />
          <img src="/images/img4.jpg" alt="Image 4" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
