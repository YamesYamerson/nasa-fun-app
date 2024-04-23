import React, { useState, useEffect } from 'react';

// Function to generate a random alien-like string
const generateAlienText = () => {
  const characters = '♨⨕♅⨈❂❇✶✺❖♅♁';
  let alienText = '';
  for (let i = 0; i < 8; i++) {
    alienText += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return alienText;
};

const ImageWithLoader = ({ src, alt, onLoad, delay = 2000 }) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state of the image
  const [showLoading, setShowLoading] = useState(true); // Control the visibility of the loading text
  const [alienText, setAlienText] = useState(generateAlienText()); // Random alien text placeholder

  const handleLoad = () => {
    if (onLoad) {
      onLoad(); // Call onLoad callback if provided
    }
    // Set a delay before hiding the loading text
    setTimeout(() => {
      setShowLoading(false); // Hide the loading text after the delay
    }, delay);
  };

  useEffect(() => {
    // Refresh the alien text if the image is reloaded
    if (!isLoaded) {
      setAlienText(generateAlienText());
    }
  }, [isLoaded]);

  return (
    <div className="image-container">
      {showLoading && <div className="image-loading">{alienText}</div>} {/* Alien-like text placeholder */}
      <img
        src={src}
        alt={alt}
        style={{ display: isLoaded ? 'block' : 'none' }} // Show image only when loaded
        onLoad={() => {
          setIsLoaded(true);
          handleLoad();
        }} // Trigger loading state change with delay
      />
    </div>
  );
};

export default ImageWithLoader;
