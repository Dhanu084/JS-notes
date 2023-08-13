const resize = (e) => {
  const { innerHeight, innerWidth } = e.target;
  console.log(innerHeight, innerWidth);
};

function throttle(fn, delay) {
  let call = true;
  const context = this;
  return (...args) => {
    if (call) {
      call = false;
      setTimeout(() => {
        fn.call(context, ...args);
        call = true;
      }, delay);
    }
  };
}

const throttledFunc = throttle(resize, 2000);

function betterThrottle(fn, delay) {
  let shouldWait = false;
  let waitingArgs = null;

  const timeoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      fn.call(this, ...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return function (...args) {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    fn.call(this, ...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

const betterThrottledFunc = betterThrottle(resize, 2000);
window.addEventListener("resize", betterThrottledFunc);
