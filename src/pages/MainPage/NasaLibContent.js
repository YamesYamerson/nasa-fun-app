import React, { useState } from 'react';
import { useFetchNasaLib } from '../../helper/useFetchNasaLib';

const NasaLibContent = () => {
  const [query, setQuery] = useState(''); // State for search query
  const [triggerFetch, setTriggerFetch] = useState(false); // State to trigger fetch

  // Fetch data with custom hook
  const { data, error, loading } = useFetchNasaLib(
    'search', // Endpoint for search
    { q: query, feedtype: 'json', ver: '1.0' }, // Query parameters with valid API key
    triggerFetch
  );

  // Function to trigger fetch with the current query
  const handleFetchData = () => {
    setTriggerFetch((prev) => !prev); // Toggle to trigger fetching
  };

  return (
    <div>
      <h2>NASA Images Library</h2>

      {/* Input field for search query */}
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the search query
        />
      </div>

      {/* Button to trigger fetching */}
      <button onClick={handleFetchData}>Search</button>

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p>Error: {error}</p>}

      {/* Display fetched data */}
      {data && data.collection && data.collection.items.length > 0 ? (
        <div>
          {data.collection.items.map((item, index) => (
            <div key={index}> {/* Unique key for each item */}
              <h3>{item.data[0].title}</h3> {/* Title */}
              <p>{item.data[0].description}</p> {/* Description */}
              <img
                src={item.links.find((link) => link.rel === 'preview').href} // Preview image
                alt={item.data[0].title} // Alt text
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No results found. Try a different search term.</p> // No results fallback
      )}
    </div>
  );
};

export default NasaLibContent;
