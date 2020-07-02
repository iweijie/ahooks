import { useRef } from 'react';
import isFunction from 'lodash/isFunction';

const useCreation = (fn, deps) => {
  const { current } = useRef({
    isMount: false,
    obj: undefined,
    deps: undefined,
  });
  if (current.isMount === false || diff(current.deps, deps)) {
    current.isMount = true;
    current.obj = isFunction(fn) ? fn() : undefined;
    current.deps = deps;
  }
  return current.obj;
};

const diff = (oldDeps, deps) => {
  if (oldDeps === deps) return true;
  for (let i in oldDeps) {
    if (oldDeps[i] !== deps[oldDeps]) return false;
  }
  return true;
};

export default useCreation;
