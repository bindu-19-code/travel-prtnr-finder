import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        {/* Video Background */}
        <video autoPlay muted loop className="background-video">
          <source src="./videos/travel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Hero Content */}
        <div className="hero-content">
          <h1>Welcome to Travel Partner Finder!</h1>
          <p>Find perfect travel partners for your next trip and make your journey memorable.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
        At Travel Buddy, we're passionate about creating meaningful connections and unforgettable experiences. Our team is dedicated to providing a safe, user-friendly platform for travelers to meet, share, and explore. We believe that travel has the power to transform lives, foster empathy, and bridge cultural divides. By joining our community, you'll become part of a movement that celebrates the joy of travel, cultural exchange, and human connection. Come join us and start your next adventure! Let's explore, learn, and grow together!
        </p>
        {/* Features */}
        <div className="features-grid">
          <div className="feature-item">
            <img src="./images/trusted-users.png" alt="Trusted Users" />
            <h3>100+ Trusted Users</h3>
            <p>Join a verified community of experienced travelers.</p>
          </div>
          <div className="feature-item">
            <img src="./images/verified-trips.png" alt="Verified Trips" />
            <h3>200+ Verified Trips</h3>
            <p>Browse trips that are reviewed and verified for your safety.</p>
          </div>
          <div className="feature-item">
            <img src="./images/support.png" alt="Support" />
            <h3>24/7 Support</h3>
            <p>Get help anytime from our dedicated support team.</p>
          </div>
        </div>
      </section>

      <section className="nice-travel-section">
  <div className="nice-travel-content">
    {/* Left - Circular Image */}
    <div className="nice-travel-image">
      <img src="./images/group-tour.png" alt="Group Tour" />
    </div>

    {/* Right - Text Content */}
    <div className="nice-travel-text">
      <h1>Travel Partner Finder - Have a Great Journey!</h1>
      <p>
        All our trips are organized for small groups, ensuring a personalized and enjoyable experience. 
        Find companions who share your travel dreams and make memories that last a lifetime!
      </p>
      <p>
        Join our community and connect with fellow travelers who love exploring new destinations. 
        Our verified users and support team ensure a smooth and safe journey every time.
      </p>
      <p>
        Being social, safe, and adventurous is our motto. Let’s make your next trip unforgettable!
      </p>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section className="contact-section">
  <h2>Contact Us</h2>
  <p>Have questions or need support? Reach out to us anytime!</p>
  <Link>travelpartnerfinder@gmail.com</Link>
</section>
    </div>
  );
};

export default Home;
