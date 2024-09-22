import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string, value: number) => {
  const [mediaQueryMatches, setMediaQueryMatches] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(${query}: ${value}px)`);

    const handler = (e: MediaQueryListEvent) => {
      setMediaQueryMatches(e.matches);
    };

    // Initial check (trigger the handler)
    setMediaQueryMatches(mql.matches);

    // Add listener for change events
    mql.addEventListener('change', handler);

    // Cleanup event listener on component unmount
    return () => mql.removeEventListener('change', handler);
  }, [query, value]);

  return mediaQueryMatches;
};
