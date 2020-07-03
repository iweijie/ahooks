import { useRef, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';

// const useDebounceEffect = (fn, deps, options) => {
//   const { run } = useDebounceFn(() => {
//     fn();
//   }, options);

//   useEffect(() => {
//     run();
//   }, deps);
// };

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
