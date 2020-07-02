import { useRef } from 'react';
import throttle from 'lodash/throttle';
import get from 'lodash/get';
import pick from 'lodash/pick';
import useCreation from '../useCreation';

const useThrottleFn = (fn, options) => {
  const objRef = useRef({});
  const fnRef = useRef(null);
  fnRef.current = fn;
  const wait = get(options, 'wait', 1000);
  const other = pick(options, ['leading', 'trailing']);
  const throttleFn = useCreation(() =>
    throttle(
      (...arg) => {
        fnRef.current(...arg);
      },
      wait,
      other,
    ),
  );

  objRef.current.run = throttleFn;
  objRef.current.cancel = throttleFn.cancel;
  return objRef.current;
};

export default useThrottleFn;