import { useEffect, useState } from 'react';

export function useDebounce(value?: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    function () {
      const timer = setTimeout(function () {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer);
    },
    [value, delay],
  );

  return debouncedValue;
}
