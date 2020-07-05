import useStorageState from './index';
import { useCallback } from 'react';

export default () => {
  const [steta, setState] = useStorageState(localStorage, 'iweijie', {
    name: 'iweijie',
    feature: '帅',
    age: 18,
  });
  const { name, feature, age } = steta;

  const handleChangeName = useCallback(
    e => {
      const value = e.target.value;
      setState({
        name: value,
      });
    },
    [setState],
  );
  const handleChangeAge = useCallback(
    e => {
      const value = e.target.value;
      setState({
        age: value,
      });
    },
    [setState],
  );

  return (
    <div>
      <div>{name}</div>
      <div>{feature}</div>
      <div>{age}</div>
      <div>
        修改名称：
        <input value={name} type="text" onChange={handleChangeName} />
      </div>
      <div>
        修改年龄：
        <input value={age} type="number" onChange={handleChangeAge} />
      </div>
    </div>
  );
};
