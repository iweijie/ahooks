import React from 'react';
import useLocalStorageState from '../index';

export default function() {
  const [message, setMessage] = useLocalStorageState('user-message', 'Hello~');
  return (
    <div>
      <pre>{JSON.stringify(message)}</pre>
      <input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={e => setMessage(e.target.value)}
      />
      <button
        style={{ margin: '0 16px' }}
        type="button"
        onClick={() => setMessage('Hello~')}
      >
        Reset
      </button>
      <button type="button" onClick={() => setMessage()}>
        Clear
      </button>
    </div>
  );
}
