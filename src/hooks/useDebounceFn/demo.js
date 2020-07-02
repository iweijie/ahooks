import { useState, useCallback } from 'react';
import useDebounceFn from './index';

let a, b, c;

export default () => {
  const [num, setNum] = useState(0);
  const debounce = useDebounceFn(() => {
    console.log(num);
    setNum(num + 1);
  });

  return (
    <div>
      <h1>useDebounceFn</h1>
      <div>当前值：{num}</div>
      <button onClick={debounce.run}>1---点我 +1</button>
      <button onClick={debounce.cancel}>点我取消</button>
    </div>
  );
};
