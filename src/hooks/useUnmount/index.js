import { useRef, useCallback, useEffect } from 'react';
import isFunction from 'lodash/isFunction';

const useUnmount = fn => {
  const fnRef = useRef(null);
  fnRef.current = fn;

  useEffect(
    () => () => {
      if (isFunction(fnRef.current)) {
        fnRef.current();
      }
    },
    [],
  );
};

export default useUnmount;
