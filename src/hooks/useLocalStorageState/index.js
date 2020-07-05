import useStorageState from '../useStorageState';

const useLocalStorageState = (key, defaultValue) => {
  return useStorageState(localStorage, key, defaultValue);
};

export default useLocalStorageState;
