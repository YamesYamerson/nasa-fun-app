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
  const observerRef = useRef(null); // Reference to the observed element

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        onIntersect(); // Call callback function when intersecting
      }
    }, options);

    const currentRef = observerRef.current; // Copy the ref to a local variable

    if (currentRef) {
      observer.observe(currentRef); // Observe the current reference
    }

    return () => {
      if (currentRef) { // Use the local variable for cleanup
        observer.unobserve(currentRef);
      }
    };
  }, [onIntersect, options]); // Ensure the effect re-runs if dependencies change

  return observerRef; // Return the ref to attach to the observed element
};

export default useIntersectionObserver;
