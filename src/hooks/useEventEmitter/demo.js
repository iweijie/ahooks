import useUnmount from './index';
import useToggle from '../useToggle';

const Com = () => {
  useUnmount(() => {
    console.log('我是一只猪 --- useUnmount');
  });
  return <div>我是一只猪</div>;
};
const Com1 = () => {
  useUnmount(() => {
    console.log('我是一蜘蛛 --- useUnmount');
  });
  return <div>我是一蜘蛛</div>;
};

export default () => {
  const [bool, toggle] = useToggle();
  return (
    <div>
      <h1>useUnmount</h1>
      <button onClick={toggle}>点我切换</button>
      <div>-----------------</div>
      {bool ? <Com /> : <Com1 />}
    </div>
  );
};
