export function setTimeoutPolyfill() {
  let id = 0;
  const timerMap = {};

  function setTimeoutHelper(fn, delay) {
    const stopTime = Date.now() + delay;
    const timerId = id++;
    timerMap[timerId] = true;

    function helper() {
      if (Date.now() >= stopTime && timerMap[timerId]) {
        fn();
        return;
      }
      requestIdleCallback(helper);
    }
    requestIdleCallback(helper);

    return id;
  }

  function clearTimeoutHelper(id) {
    delete timerMap[id];
  }

  return { setTimeoutHelper, clearTimeoutHelper };
}

function loggingFunction() {
  console.log("check");
}

const { setTimeoutHelper, clearTimeoutHelper } = setTimeoutPolyfill();

// let id = setTimeoutHelper(loggingFunction, 3000);
// id = setTimeoutHelper(loggingFunction, 500);
// clearTimeoutHelper(id);
