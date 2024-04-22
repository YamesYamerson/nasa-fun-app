import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Ensure correct relative path
import Home from './Home';
import POTDContent from './PotdContent';
import './MainPage.css'; // Styles for the MainPage
import './Home.css'; // Styles for the Home component
import '../../components/Navbar.css'; // Styles for the Navbar component
import MarsRoverContent from './MarsRoverContent';
import EpicContent from './EpicContent';
import NeoWsContent from './NeoWsContent';
import DonkiContent from './DonkiContent';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'picoftheday':
        return <POTDContent />;
      case 'marsrover':
        return <MarsRoverContent />;
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
      <Navbar onNavigate={setCurrentPage} /> {/* Navbar component */}
      {renderPage()} {/* Display selected component */}
    </div>
  );
};

export default MainPage;
