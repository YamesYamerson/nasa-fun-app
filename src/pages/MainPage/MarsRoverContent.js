import React, { useState } from 'react';
import { useFetchMarsRoverPhotos } from '../../helper/useFetchMarsRoverPhotos';
import useIntersectionObserver from '../../helper/useIntersectionObserver';
import ImageWithLoader from '../../components/ImageWithLoader'; // Import the new component
import './MarsRoverContent.css';
import HappyPlanetLoading from '../../components/HappyPlanetLoading';

const MarsRoverContent = ({ sol }) => {
  const [page, setPage] = useState(1); // Pagination
  const pageSize = 5;

  const { data, error, loading } = useFetchMarsRoverPhotos(sol, page, pageSize);

  const onIntersect = () => {
    setPage((prev) => prev + 1); // Load more photos when intersected
  };

  const observerRef = useIntersectionObserver(onIntersect);

  if (loading && page === 1) { // Initial loading state
    return <HappyPlanetLoading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No photos available for this sol</div>;
  }

  return (
    <div className="mars-rover-content">
      <h1 className="mars-rover-title">Mars Rover Photos for Sol {sol}</h1>
      <div className="mars-rover-photos">
        {data.map((photo) => (
          <div key={photo.id} className="mars-rover-photo">
            <ImageWithLoader
              src={photo.img_src}
              alt={`Photo taken by ${photo.rover.name}`} // Corrected alt attribute
            />
            {photo.camera.full_name && (
              <p>Camera: {photo.camera.full_name}</p> // Display camera information
            )}
          </div>
        ))}
      </div>
      <div ref={observerRef} className="load-more">Load more...</div> {/* Trigger for lazy loading */}
    </div>
  );
};

export default MarsRoverContent;
