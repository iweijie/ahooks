import useMount from './index';
import useToggle from '../useToggle';

const Com = () => {
  useMount(() => {
    console.log('我是一只猪');
  });
  return <div>我是一只猪</div>;
};
const Com1 = () => {
  useMount(() => {
    console.log('我是一蜘蛛');
  });
  return <div>我是一蜘蛛</div>;
};

export default () => {
  const [bool, toggle] = useToggle();
  return (
    <div>
      <h1>useMount</h1>
      <button onClick={toggle}>点我切换</button>
      <div>-----------------</div>
      {bool ? <Com /> : <Com1 />}
    </div>
  );
};
