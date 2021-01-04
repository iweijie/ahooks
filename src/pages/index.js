import React, { useState, useCallback } from 'react';
import styles from './index.less';

// import Demo from '../hooks/usePersistFn/demo';
// import Demo from '../hooks/useMount/demo';
// import Demo from '../hooks/useUnmount/demo';
// import Demo from '../hooks/usePrevEqual/demo';
// import Demo from '../hooks/useCreation/demo';
// import Demo from '../hooks/useToggle/demo';
// import Demo from '../hooks/useDebounceFn/demo';
// import Demo from '../hooks/useBoolean/demo';
// import Demo from '../hooks/useUpdate/demo';
// import Demo from '../hooks/useSetState/demo';
// import Demo from '../hooks/useDebounce/demo';
// import Demo from '../hooks/useDebounceEffect/demo';
// import { Demo1, Demo2, Demo3 } from '../hooks/useControllableValue/demo';
// import Demo from '../hooks/useCounter/demo';
// import Demo from '../hooks/useStorageState/demo';
// import Demo1 from '../hooks/useLocalStorageState/demo/1';
// import Demo2 from '../hooks/useLocalStorageState/demo/2';
// import Demo3 from '../hooks/useLocalStorageState/demo/3';

import Demo1 from '../hooks/useSessionStorageState/demo/1';
import Demo2 from '../hooks/useSessionStorageState/demo/2';
import Demo3 from '../hooks/useSessionStorageState/demo/3';
import Note from './Note/index';
import htmlString from './Note/htmlString';

export default () => {
  const [list, setList] = useState([]);
  const onChange = useCallback(
    list => {
      console.log(list);
      setList(l => {
        return [...l, ...list];
      });
    },
    [setList],
  );
  return (
    <div>
      <h1 className={styles.title}>Page header</h1>
      <Note onChange={onChange} value={list} template={htmlString} />
      <footer className={styles.title}>Page footer</footer>
    </div>
  );
};
