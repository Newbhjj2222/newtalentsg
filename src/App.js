import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Home from './pages/Home';
import PostDetails from './components/PostDetails';
import Contact from './pages/Contact';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Tv from './pages/Tv';

import { MdAccountBalance } from 'react-icons/md';
import './App.css';

// Context
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

            {/* Pages zashya */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tv" element={<Tv />} />
          </Routes>

          <Footer />

          <a
            href="/Balance.html"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn"
          >
            <MdAccountBalance size={24} />
          </a>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
