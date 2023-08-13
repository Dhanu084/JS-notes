function PromisePolyfill(fn) {
  let onResolve, onReject;
  let value;
  let fulFilled = false,
    rejected = false;
  let called = false;

  function resolve(val) {
    value = val;
    fulFilled = true;
    if (!called && typeof onResolve === "function") {
      onResolve(val);
      called = true;
    }
  }

  this.then = (callback) => {
    onResolve = callback;
    if (!called && fulFilled) {
      onResolve(value);
      called = true;
    }
    return this;
  };

  function reject(err) {
    value = err;
    rejected = true;
    if (!called && typeof onReject === "function") {
      onReject(err);
      called = true;
    }
  }

  this.catch = (callback) => {
    onReject = callback;
    if (!called && rejected) {
      called = true;
      onReject(value);
    }
  };

  fn(resolve, reject);
}

PromisePolyfill.all = (promises) =>
  new PromisePolyfill((resolve, reject) => {
    const result = [];
    let resolved = 0;
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          result[index] = res;
          if (++resolved === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

PromisePolyfill.allSettled = (promises) =>
  new PromisePolyfill((resolve, reject) => {
    const result = [];
    let count = 0;
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          result[index] = { status: "fulFilled", value: res };
          if (++count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          result[index] = { status: "rejected", value: err };
          if (++count === promises.length) {
            resolve(result);
          }
        });
    });
  });

let myPromise = new PromisePolyfill((res, rej) => {
  res(100);
});
myPromise.then((res) => {
  console.log(res);
});

myPromise = new PromisePolyfill((res, rej) => {
  setTimeout(() => {
    res(1000);
  }, 2000);
});
myPromise.then((res) => {
  console.log(res);
});

const promiseArray = () => [
  new PromisePolyfill((resolve, reject) => {
    resolve("Promise 1");
  }),
  new PromisePolyfill((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 2");
    }, 2000);
  })
];
PromisePolyfill.all(promiseArray()).then((res) => console.log(res));

PromisePolyfill.all([
  ...promiseArray(),
  new PromisePolyfill((resolve, reject) => reject("err"))
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

PromisePolyfill.allSettled(promiseArray()).then((res) => console.log(res));
