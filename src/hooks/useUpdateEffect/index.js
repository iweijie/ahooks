import { useState, useEffect } from 'react';
import usePersistFn from '../usePersistFn';

const useUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
