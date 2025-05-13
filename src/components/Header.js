import React, { useState } from 'react';
import './Header.css';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <span className="animate">New</span>
          <span className="animate">talents</span>
          <span className="animate">G</span>
        </h1>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <FaBars size={24} />
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="/home">Homepage</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/tv">NewtalentsG Tv</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </header>
  );
};

export default Header;
