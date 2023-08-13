import { setTimeoutPolyfill } from "./setTimeoutPolyfill.js";

function setIntervalPolyfill() {
  const timerMap = {};
  let intervalId = 0;
  const { setTimeoutHelper, clearTimeoutHelper } = setTimeoutPolyfill();

  function setIntervalHelper(fn, delay) {
    const id = intervalId;
    function helper() {
      timerMap[id] = setTimeoutHelper(() => {
        fn();
        if (timerMap[id]) requestIdleCallback(helper);
      }, delay);
    }
    helper();
    return intervalId++;
  }

  function clearIntervalHelper(id) {
    clearTimeoutHelper(timerMap[id]);
    delete timerMap[id];
  }

  return { setIntervalHelper, clearIntervalHelper };
}

function logging1() {
  console.log("interval logging");
}

const { setIntervalHelper, clearIntervalHelper } = setIntervalPolyfill();

let id = setIntervalHelper(logging1, 2000);

setTimeout(() => {
  clearIntervalHelper(id);
}, 8000);
