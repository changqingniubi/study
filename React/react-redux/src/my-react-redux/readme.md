- React-Redux是连接React和Redux的库，同时使用了React和Redux的API。
- React-Redux主要是使用了React的context api来传递Redux的store。
- Provider的作用是接收Redux store并将它放到context上传递下去。
- connect的作用是从Redux store中选取需要的属性传递给包裹的组件。
- connect会自己判断是否需要更新，判断的依据是需要的state是否已经变化了。
- connect在判断是否变化的时候使用的是浅比较，也就是只比较一层，所以在mapStateToProps和mapDispatchToProps中不要反回多层嵌套的对象。
- 为了解决父组件和子组件各自独立依赖Redux，破坏了React的父级->子级的更新流程，React-Redux使用Subscription类自己管理了一套通知流程。
- 只有连接到Redux最顶级的组件才会直接注册到Redux store，其他子组件都会注册到最近父组件的subscription实例上。
- 通知的时候从根组件开始依次通知自己的子组件，子组件接收到通知的时候，先更新自己再通知自己的子组件。



[参考文章1](https://juejin.cn/post/6847902222756347911)