import { useState, useCallback } from 'react';
import isFunction from 'lodash/isFunction';

const useSetState = defaultValue => {
  const [state, setValues] = useState(defaultValue);
  const setState = useCallback(
    patch => {
      setValues(values => {
        return Object.assign(
          {},
          values,
          isFunction(patch) ? patch(values) : patch,
        );
      });
    },
    [setValues],
  );
  return [state, setState];
};

export default useSetState;
