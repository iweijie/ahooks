import useCreation from './index';
import usePrevEqual from '../usePrevEqual';
import useToggle from '../useToggle';

export default () => {
  const [num, { toggle }] = useToggle(false, true);
  const obj = useCreation(() => {
    return {
      weijie: 1,
    };
  });

  console.log('useCreation', usePrevEqual(obj));

  return (
    <div>
      <h1>useUnmount</h1>
      <div>当前值是：{num}</div>
      <button onClick={toggle}>点我切换</button>
    </div>
  );
};
