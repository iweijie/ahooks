import React from 'react';
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
import Demo from '../hooks/useDebounceEffect/demo';


export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Demo />
    </div>
  );
};
