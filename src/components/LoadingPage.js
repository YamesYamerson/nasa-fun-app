import React from 'react';
import './LoadingPage.css'; // Import CSS file for styling

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div className="star" key={i}></div>
        ))}
      </div>
      <div className="planet"></div>
      <div className="rocket"></div>
      <h1>Loading...</h1>
    </div>
  );
};

export default LoadingPage;
