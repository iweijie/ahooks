import { useRef } from 'react';

const usePrevEqual = value => {
  const dataRef = useRef(null);
  const { current } = dataRef;
  dataRef.current = value;
  return current === value;
};

export default usePrevEqual;
