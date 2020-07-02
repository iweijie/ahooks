import { useRef, useCallback } from 'react';
import isFunction from 'lodash/isFunction';

const usePersistFn = fn => {
  const fnRef = useRef(null);
  fnRef.current = fn;

  const persistFn = useCallback(
    (...arg) => {
      if (isFunction(fnRef.current)) {
        return fnRef.current(...arg);
      }
      return undefined;
    },
    [fnRef],
  );

  return persistFn;
};

export default usePersistFn;
