import { useCallback, useState } from 'react';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import useSetState from '../useSetState';

const StringToJSON = value => {
  try {
    return JSON.parse(value);
  } catch (err) {}
};

const JSONToString = value => {
  try {
    return JSON.stringify(value);
  } catch (err) {}
};

const useStorageState = (storage, key, defaultValue) => {
  const getValue = () => {
    const value = StringToJSON(storage.getItem(key));
    if (value) return value;
    if (defaultValue)
      return isFunction(defaultValue) ? defaultValue() : defaultValue;
  };

  const [state, setState] = useState(() => getValue());

  const updater = useCallback(
    arg => {
      const prevValue = getValue();

      const current = isFunction(arg) ? arg(prevValue) : arg;
      if (isUndefined(current)) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSONToString(current));
      }
      /** setState：传入参数为函数时，异步调用  */
      setState(current);

      // setState(value => {
      //   const current = isFunction(arg) ? arg(value) : arg;
      //   if (isUndefined(current)) {
      //     storage.removeItem(key);
      //   } else {
      //     storage.setItem(key, JSONToString(current));
      //   }
      //   return current;
      // });
    },
    [setState],
  );
  return [state, updater];
};

export default useStorageState;
