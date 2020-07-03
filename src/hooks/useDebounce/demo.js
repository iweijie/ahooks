import { useState, useCallback } from 'react';
// import { useDebounce } from 'ahooks';
import useDebounce from './index';

export default () => {
  const [num, setNum] = useState(0);
  const value = useDebounce(num);

  const add = useCallback(() => {
    setNum(num + 1);
  }, [num]);

  return (
    <div>
      <h1>useDebounceFn</h1>
      <div>当前值：{num}</div>
      <div>延后返回值：{value}</div>
      <button onClick={add}>1---点我 +1</button>
    </div>
  );
};
