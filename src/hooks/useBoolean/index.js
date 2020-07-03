import { useState } from 'react';
import useToggle from '../useToggle';
import isUndefined from 'lodash/isUndefined';
import usePersistFn from '../usePersistFn';

const useBoolean = defaultValue => {
  const [value, { toggle }] = useToggle(!!defaultValue, !defaultValue);

  const setTrue = usePersistFn(() => {
    if (!value) {
      toggle();
    }
  });
  const setFalse = usePersistFn(() => {
    if (!!value) {
      toggle();
    }
  });

  return [
    value,
    {
      toggle,
      setTrue,
      setFalse,
    },
  ];
};

export default useBoolean;
