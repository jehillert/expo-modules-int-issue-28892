import { MutableRefObject, useEffect, useRef } from 'react';

function usePrevious<T>(
  value: T,
  initialPrevValue: T | undefined = undefined,
): MutableRefObject<T>['current'] {
  const ref = useRef<T>(
    initialPrevValue !== undefined ? initialPrevValue : value,
  );
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export { usePrevious };
