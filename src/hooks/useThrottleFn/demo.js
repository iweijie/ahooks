import { useState, useCallback } from 'react';
import useDebounceFn from './index';

export default () => {
  const [num, setNum] = useState(0);
  const { run, cancel } = useDebounceFn((...arg) => {
    console.log(...arg);
    setNum(num + 1);
  });

  const click = useCallback(() => {
    run(111);
  }, [run]);

  return (
    <div>
      <h1>useDebounceFn</h1>
      <div>当前值：{num}</div>
      <button onClick={click}>点我 +1</button>
      <button onClick={cancel}>点我取消</button>
    </div>
  );
};
