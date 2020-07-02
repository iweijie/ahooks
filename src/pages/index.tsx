import React from 'react';
import styles from './index.less';

// import Demo from '../hooks/usePersistFn/demo';
// import Demo from '../hooks/useMount/demo';
// import Demo from '../hooks/useUnmount/demo';
// import Demo from '../hooks/useToggle/demo';
import Demo from '../hooks/useDebounceFn/demo';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Demo />
    </div>
  );
};
