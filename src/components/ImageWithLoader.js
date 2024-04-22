import React, { useState } from 'react';

const ImageWithLoader = ({ src, alt, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state of the image

  const handleLoad = () => {
    setIsLoaded(true); // Set true when image is fully loaded
    if (onLoad) {
      onLoad(); // Call onLoad callback if provided
    }
  };

  return (
    <div className="image-container">
      {!isLoaded && <div className="image-loading">Loading...</div>} {/* Loading placeholder */}
      <img
        src={src}
        alt={alt}
        style={{ display: isLoaded ? 'block' : 'none' }} // Show image only when loaded
        onLoad={handleLoad} // Trigger loading state change
      />
    </div>
  );
};

export default ImageWithLoader;
