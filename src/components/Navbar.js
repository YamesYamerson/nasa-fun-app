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
          <button onClick={() => onNavigate('picoftheday')}>APOD</button>
        </li>
        <li>
          <button onClick={() => onNavigate('marsrover')}>Mars Rover</button>
        </li>
        <li>
          <button onClick={() => onNavigate('epic')}>EPIC</button>
        </li>
        <li>
          <button onClick={() => onNavigate('neow')}>NEO</button>
        </li>
        <li>
          <button onClick={() => onNavigate('donki')}>DONKI</button>
        </li>
        <li>
          <button onClick={() => onNavigate('earth')}>EARTH</button>
        </li>
        <li>
          <button onClick={() => onNavigate('insight')}>INSIGHT</button>
        </li>
        <li>
          <button onClick={() => onNavigate('nasalib')}>NASA LIB</button>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
