import { useState, useMemo, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import isFunction from 'lodash/isFunction';

const useControllableValue = (props = {}, options = {}) => {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  const value = props[valuePropName];

  const initialValue = useMemo(() => {
    if (valuePropName in props) {
      return value;
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  }, []);

  const [state, setState] = useState(initialValue);

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const handleSetState = useCallback(
    v => {
      if (!(valuePropName in props)) {
        setState(v);
      }
      if (isFunction(props[trigger])) {
        props[trigger](v);
      }
    },
    [trigger, props, value],
  );

  return [state, handleSetState];
};

export default useControllableValue;
