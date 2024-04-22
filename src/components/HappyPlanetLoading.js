import React from 'react';
import './HappyPlanetLoading.css'; // Import the CSS animation styles
import HappyPlanet3 from '../assets/happy-planet-3.png'; // Import the planet face image
const HappyPlanetLoading = () => {
  return (
    <div className='loading-container'>
        <div className="happy-planet-loading"> {/* Main container for the spinning planet */}
          <div className="happy-planet-face">
            <img src={HappyPlanet3} alt="Happy Planet Face" /> {/* Image of the planet face */}
        </div> {/* Smiley face for the planet */}
        </div>
    </div>
  );
};

export default HappyPlanetLoading; // Export the loading animation component
