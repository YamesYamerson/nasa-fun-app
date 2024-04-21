import React from 'react';
import './Navbar.css'; // Styles for the navbar

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={() => onNavigate('home')}>Home</button>
        </li>
        <li>
          <button onClick={() => onNavigate('picoftheday')}>Daily Pic</button>
        </li>
        <li>
          <button onClick={() => onNavigate('marsrover')}>Mars Rover</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
