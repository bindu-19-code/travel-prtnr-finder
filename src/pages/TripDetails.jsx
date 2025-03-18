import React from 'react';
import { useParams } from 'react-router-dom';

const TripDetails = () => {
  const { id } = useParams();

  return (
    <div className="trip-details">
      <h1>Trip Details</h1>
      <p>Trip ID: {id}</p>
      <p>Destination: TBD</p>
      <p>Date: TBD</p>
      <p>Description: Trip details coming soon...</p>
    </div>
  );
};

export default TripDetails;
