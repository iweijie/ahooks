import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';

const useDebounce = value => {
  const [state, setState] = useState(value);
  const { run } = useDebounceFn(() => {
    setState(value);
  });
  useEffect(() => {
    run();
  }, [value]);

  return state;
};

export default useDebounce;
