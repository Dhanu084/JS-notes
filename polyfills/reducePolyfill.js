const arr = [1, 2, 3, 4, 3, 4];

const sum = arr.reduce((acc, curr, index) => {
  return acc + curr;
}, 0);

console.log(sum);

function addCallback(prev, item, index) {
  return prev + item;
}

function freq(acc, item, index) {
  acc[item] = acc[item] ? acc[item] + 1 : 1;
  return acc;
}

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue || 0;
  for (let i = 0; i < this.length; i++) {
    if (accumulator || typeof accumulator === "object") {
      accumulator = callback.call(null, accumulator, this[i], i);
    } else {
      accumulator = this[i];
    }
  }
  return accumulator;
};

// console.log(arr.myReduce(addCallback, 0));

console.log(arr.myReduce(freq, {}));
