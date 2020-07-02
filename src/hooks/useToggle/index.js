import { useState } from 'react';
import usePersistFn from '../usePersistFn';
import isUndefined from 'lodash/isUndefined';

const useToggle = (defaultValue = false, reverseValue) => {
  const [value, setValue] = useState(defaultValue);
  const toggle = usePersistFn(() => {
    if (isUndefined(reverseValue)) {
      reverseValue = !defaultValue;
    }
    setValue(value === defaultValue ? reverseValue : defaultValue);
  });
  const setLeft = usePersistFn(() => {
    if (value === defaultValue) return;
    setValue(defaultValue);
  });

  const setRight = usePersistFn(() => {
    if (value === reverseValue) return;
    if (isUndefined(reverseValue)) {
      reverseValue = !defaultValue;
    }
    setValue(reverseValue);
  });
  return [
    value,
    toggle,
    {
      setLeft,
      setRight,
    },
  ];
};

export default useToggle;
