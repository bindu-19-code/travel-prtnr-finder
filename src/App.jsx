import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FindPartners from './pages/FindPartners';
import Profile from './pages/Profile';
import Chat from './components/Chat';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import CreateTrip from "./pages/CreateTrip";
import { TripProvider } from './context/TripContext';
import Footer from './components/Footer';
import './App.css';

// ✅ Protected Route Function
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <TripProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* ✅ Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/find-partners" element={
              <ProtectedRoute>
                <FindPartners />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/Chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/create-trip" element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            } />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </TripProvider>
  );
}

export default App;