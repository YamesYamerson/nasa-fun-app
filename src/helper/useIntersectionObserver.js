import { useEffect, useRef } from 'react';

/**
 * Custom hook to create an Intersection Observer and call a callback function
 * when the observed element intersects the viewport.
 * 
 * @param {Function} onIntersect - Function to call when the observed element intersects.
 * @param {Object} options - Intersection Observer options (e.g., { threshold: 1.0 }).
 * @returns {Object} - Ref object to attach to the element to be observed.
 */
const useIntersectionObserver = (onIntersect, options = { threshold: 1.0 }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]; // We only care about the first entry
      if (entry.isIntersecting) {
        onIntersect(); // Call the callback function when intersecting
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [onIntersect, options]); // Run the effect when 'onIntersect' or 'options' change

  return observerRef; // Return the ref to attach to the element
};

export default useIntersectionObserver;
