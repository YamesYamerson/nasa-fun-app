import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import HappyPlanetLoading from '../../components/HappyPlanetLoading'; // Global loading animation
import Home from './Home';
import POTDContent from './PotdContent';
import MarsRoverContent from './MarsRoverContent';
import EpicContent from './EpicContent';
import NeoWsContent from './NeoWsContent';
import DonkiContent from './DonkiContent';
import './MainPage.css';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Current page
  const [globalLoading, setGlobalLoading] = useState(true); // Overall loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalLoading(false); // Simulate data fetching delay
    }, 2000); // Adjust the delay as needed (for demo purposes)

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [currentPage]); // Re-run when currentPage changes

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'picoftheday':
        return <POTDContent />;
      case 'marsrover':
        return <MarsRoverContent sol={1000} />; // Include sol value for MarsRoverContent
      case 'epic':
        return <EpicContent />;
      case 'neow':
        return <NeoWsContent />;
      case 'donki':
        return <DonkiContent />;
      default:
        return <Home />;
    }
  };

  return (
    <div className='page-container'>
      <Navbar onNavigate={setCurrentPage} /> {/* Navbar at the top */}
      {globalLoading ? (
        <HappyPlanetLoading /> // Display the global loading animation
      ) : (
        renderPage() // Render the selected page content
      )}
    </div>
  );
};

export default MainPage;
