import React, { useState, useCallback } from 'react';
import useControllableValue from './index';

export const Demo1 = props => {
  const [state, setState] = useControllableValue(props, {
    defaultValue: 1,
  });

  return (
    <>
      <input
        type="number"
        value={state}
        onChange={() => setState(state + 1)}
        style={{ width: 300 }}
      />
      <button
        type="button"
        onClick={() => setState(state + 1)}
        style={{ margin: '0 4px' }}
      >
        +
      </button>
      <button type="button" onClick={() => setState(state - 1)}>
        -
      </button>
    </>
  );
};

const ControllableComponent = props => {
  const [state, setState] = useControllableValue(props);

  return (
    <input
      value={state}
      onChange={() => setState(state + 1)}
      style={{ width: 300 }}
    />
  );
};

export const Demo2 = () => {
  const [state, setState] = useState(0);
  const increment = () => {
    setState(s => s + 1);
  };

  const decrease = () => {
    setState(s => s - 1);
  };

  return (
    <>
      <ControllableComponent value={state} onChange={setState} />
      <button type="button" onClick={increment} style={{ margin: '0 4px' }}>
        +
      </button>
      <button type="button" onClick={decrease}>
        -
      </button>
    </>
  );
};

const ControllableComponent1 = props => {
  const [state, setState] = useControllableValue(props);

  return (
    <input
      value={state}
      onChange={e => {
        setState(e.target.value);
      }}
      style={{ width: 300 }}
    />
  );
};

export const Demo3 = () => {
  const [state, setState] = useState(0);

  return (
    <>
      <div style={{ marginBottom: 8 }}>state:{state}</div>
      <ControllableComponent1 onChange={setState} />
    </>
  );
};
