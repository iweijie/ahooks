import { useRef, useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';

const useDebounceEffect = (fn, deps, options) => {
  const [data, setData] = useState(0);
  const { run } = useDebounceFn(() => {
    setData(data + 1);
  }, options);

  useEffect(() => {
    run();
  }, deps);

  useUpdateEffect(fn, [data]);
};

export default useDebounceEffect;
