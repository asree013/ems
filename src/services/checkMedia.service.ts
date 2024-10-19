import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState<boolean>(false);
  
    useEffect(() => {
      const mediaQueryList = window.matchMedia(query);
      const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
  
      // Set the initial state
      setMatches(mediaQueryList.matches);
      // Listen for changes
      mediaQueryList.addEventListener('change', handleChange);
  
      // Cleanup listener on unmount
      return () => {
        mediaQueryList.removeEventListener('change', handleChange);
      };
    }, [query]);
  
    return matches;
  };