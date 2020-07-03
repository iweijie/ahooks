import { useState } from 'react';
import usePersistFn from '../usePersistFn';

const useUpdate = defaultValue => {
  const [num, setNum] = useState(0);

  const update = usePersistFn(() => {
    setNum(num + 1);
  });

  return update;
};

export default useUpdate;
