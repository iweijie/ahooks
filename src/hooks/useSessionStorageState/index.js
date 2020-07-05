import useStorageState from '../useStorageState';

const useSessionStorageState = (key, defaultValue) => {
  return useStorageState(sessionStorage, key, defaultValue);
};

export default useSessionStorageState;
