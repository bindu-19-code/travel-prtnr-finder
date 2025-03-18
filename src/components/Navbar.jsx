// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav>
//       <h2>Travel Partner Finder</h2>
//       <div>
//         <Link to="/home">Home</Link>
//         <Link to="/find-partners">Find Partners</Link>
//         <Link to="/login">Logout</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Travel Buddy</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/create-trip">Create Trip</Link></li>
        <li><Link to="/find-partners">Find Partners</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;


