import React, { useCallback } from 'react';
import useSessionStorageState from '../index';

export default function() {
  const [user, setUser] = useSessionStorageState('user', {
    id: 9234634791,
    name: 'Zhangsan',
    age: 33,
  });

  const handle = useCallback(
    e => {
      const value = e.target.value;
      setUser(u => ({ ...u, name: value }));
    },
    [setUser],
  );

  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
      <input
        style={{ width: 200 }}
        defaultValue={user.name}
        placeholder="input user name"
        onChange={handle}
      />
    </div>
  );
}
