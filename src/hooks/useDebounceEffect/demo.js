import { useState } from 'react';
import useDebounceEffect from './index';

export default () => {
  const [num, setNum] = useState(0);
  const [num1, setNum1] = useState(0);

  useDebounceEffect(() => {
    setNum1(num);
  }, [num, num1]);

  return (
    <div>
      <h1>useDebounceEffect</h1>
      <div>当前值--1--：{num}</div>
      <div>延时值--2--：{num1}</div>
      <button onClick={() => setNum(num + 1)}>点我 +1</button>
    </div>
  );
};
