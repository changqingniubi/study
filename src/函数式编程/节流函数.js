//节流函数和防抖函数很像，但是针对的需求不一样，比如onScorll方法可能会触发的很频繁，我们不能每次触发的时候都去调回调，会浪费大量性能，我们可能需要每50ms调用一次，那就需要节流函数了：

const scrollHandler = () => {
  console.log('scroll...')
};
const throttle = (fn, waitTime) => {
  let isRunnig = false;
  return (...args) => {
    if(!isRunnig) {
      isRunnig = true;
      setTimeout(() => {
        fn(...args);
        isRunnig = false;
      }, waitTime)
    }
  }
}
const throttledScrollHandler = throttle(scrollHandler, 50);
