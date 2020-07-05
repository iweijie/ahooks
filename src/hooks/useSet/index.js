import { useCallback, useState } from 'react';
import useUpdate from '../useUpdate';

const useSet = defaultValue => {
  const [state, setState] = useState(() => {
    if (defaultValue instanceof Set) return defaultValue;
    return new Set();
  });
  const update = useUpdate();

  const actions = useMemo(() => {
    const add = value => {
      const temp = set.add(value);
      update();
      return temp;
    };

    const has = value => {
      return state.has(value);
    };

    const remove = value => {
      return state.delete(value);
    };

    const reset = () => {
      return state.clear();
    };

    return {
      add,
      has,
      remove,
      reset,
    };
  }, [setState]);

  return [state, actions];
};

export default useStorageState;
