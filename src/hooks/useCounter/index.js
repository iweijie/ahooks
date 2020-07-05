import { useState, useMemo, useCallback } from 'react';
import isNumber from 'lodash/isNumber';
import useCreation from '../useCreation';
import { isFunction } from 'lodash';

const useCounter = (initialValue = 0, options = {}) => {
  const { max, min } = options;

  const init = useCreation(() => {
    let num = initialValue;
    if (isNumber(max)) {
      num = Math.min(max, num);
    }
    if (isNumber(min)) {
      num = Math.max(max, num);
    }
    return num;
  }, []);

  const [current, setCurrent] = useState(init);

  const actions = useMemo(() => {
    const setValue = arg => {
      // debugger;
      setCurrent(current => {
        /** 传入的函数， 设置为函数的返回值， 传入的数字设置为数值， 否则，为当前值不变  */
        let value = isFunction(arg) ? arg(current) : arg;
        value = isNumber(value) ? value : current;

        if (isNumber(max)) {
          value = Math.min(max, value);
        }
        if (isNumber(min)) {
          value = Math.max(min, value);
        }
        return value;
      });
    };

    const inc = () => {
      setValue(val => val + 1);
    };
    const dec = () => {
      setValue(val => val - 1);
    };
    const set = arg => {
      setValue(arg);
    };

    const reset = arg => {
      setValue(init);
    };
    return {
      inc,
      dec,
      set,
      reset,
    };
  }, []);

  return [current, actions];
};

export default useCounter;
