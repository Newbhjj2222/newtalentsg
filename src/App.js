import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Home from './pages/Home';
import PostDetails from './components/PostDetails';
import Contact from './pages/Contact';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Tv from './pages/Tv';
import Balance from './pages/Balance'; // yinjijwe hano

import { MdAccountBalance } from 'react-icons/md';
import './App.css';

import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/balance" element={<Balance />} /> {/* Balance Page */}
          </Routes>

          <Footer />

          <Link to="/balance" className="floating-btn">
            <MdAccountBalance size={24} />
          </Link>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
