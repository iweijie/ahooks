import { useRef } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import pick from 'lodash/pick';
import useCreation from '../useCreation';

const useDebounceFn = (fn, options) => {
  const objRef = useRef({});
  const fnRef = useRef(null);
  fnRef.current = fn;
  const wait = get(options, 'wait', 1000);
  const other = pick(options, ['leading', 'trailing']);
  const debounceFn = useCreation(() =>
    debounce(
      (...arg) => {
        fnRef.current(...arg);
      },
      wait,
      other,
    ),
  );

  objRef.current.run = debounceFn;
  objRef.current.cancel = debounceFn.cancel;
  return objRef.current;
};

export default useDebounceFn;
