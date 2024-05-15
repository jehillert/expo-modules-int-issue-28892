import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef } from 'react';
import { AnyCallback } from '../types';

const useDebounce = (callback: AnyCallback, milliseconds = 200) => {
  const ref = useRef<AnyCallback>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref?.current?.();
    };

    return debounce(func, milliseconds);
  }, []);

  return debouncedCallback;
};

export { useDebounce };
