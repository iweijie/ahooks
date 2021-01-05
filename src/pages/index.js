import React, { useState, useCallback, Profiler } from 'react';
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
import htmlString from './htmlString';

function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions, // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
}

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
      {/* Page header */}
      <h1 className={styles.title}> </h1>
      <Profiler id="Note" onRender={onRenderCallback}>
        <Note onChange={onChange} value={list} template={htmlString} />
      </Profiler>
      <footer className={styles.title}> </footer>
      {/* Page footer */}
    </div>
  );
};
