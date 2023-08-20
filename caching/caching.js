let ctr = 0;
const callApi = async (url, config) => {
  try {
    let response = await fetch(url, { ...config });
    response = await response.json();
    return response;
  } catch (err) {
    throw err;
  }
};

function cachedFunc(fn, url, config, time) {
  let cache = {};
  return async () => {
    const key = `${url}-${JSON.stringify(config)}`;
    const entry = cache[key];
    console.log(entry, entry?.expiry >= Date.now());
    if (!entry || entry.expiry <= Date.now()) {
      try {
        console.log(++ctr, "calling api");
        const result = await fn(url, config);
        cache[key] = { result, expiry: Date.now() + time };
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(++ctr, "from cache");
    }
  };
}

const apiCall = cachedFunc(
  callApi,
  "https://jsonplaceholder.typicode.com/todos/1",
  { method: "GET" },
  2000
);
apiCall();

setTimeout(() => {
  apiCall();
}, 1500);

setTimeout(() => {
  apiCall();
}, 3100);
