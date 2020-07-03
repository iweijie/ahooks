import { useState } from 'react';
import usePrevEqual from './index';
import useUpdate from '../useUpdate';

export default () => {
  const [num, setNum] = useState(0);
  const update = useUpdate();
  return (
    <div>
      <h1>useBoolean</h1>
      <div>当前值是否更新：{usePrevEqual(num) ? 'true' : 'false'}</div>
      <button onClick={() => setNum(num + 1)}>点我+1</button>
      <button onClick={update}>点我刷新</button>
    </div>
  );
};
