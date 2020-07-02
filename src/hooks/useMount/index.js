import { useRef, useCallback, useEffect } from 'react';
import usePersistFn from '../usePersistFn';

const useMount = fn => {
  const persistFn = usePersistFn(fn);
  useEffect(() => {
    persistFn();
  }, []);
};

export default useMount;
