import { useCallback, useState } from 'react';
import isFunction from 'lodash/isFunction';

/** TODO  */
const usePrevious = (value, key, defaultValue) => {
  const [state, setState] = useState(() => getValue());

  return [state, updater];
};

export default usePrevious;
