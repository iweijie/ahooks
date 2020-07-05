import React from 'react';
import useLocalStorageState from '../index';

const defaultArray = ['a', 'e', 'i', 'o', 'u'];

export default function() {
  const [value, setValue] = useLocalStorageState('cascader', defaultArray);

  return (
    <div>
      <pre>{JSON.stringify(value)}</pre>
      <p>{value.join('-')}</p>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() =>
          setValue([
            ...value,
            Math.random()
              .toString(36)
              .slice(-1),
          ])
        }
      >
        push random
      </button>
      <button type="button" onClick={() => setValue(defaultArray)}>
        reset
      </button>
    </div>
  );
}
