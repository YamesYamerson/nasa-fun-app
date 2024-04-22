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
        <li>
          <button onClick={() => onNavigate('epic')}>Climate Images</button>
        </li>
        <li>
          <button onClick={() => onNavigate('neow')}>Near Earth Object Images</button>
        </li>
        <li>
          <button onClick={() => onNavigate('donki')}>DONKI</button>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
