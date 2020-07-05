# 技术总结

## useState
> return  [ state, setState ]

1. 可传入函数，只会在初始化调用
2. 返回值 setState 为固定函数
3. setState 当传入函数是，参数为当前 state 的值，返回值为更新值；
4. setState 传入函数为异步调用（比如传入 react ） 

# useDebounceFn

> 每次返回的 obj 都不同， 可使用 useRef 包裹

# useThrottleFn

> 同上
