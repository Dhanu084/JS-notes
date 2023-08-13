const search = (e) => {
  console.log(e.target.value);
};

const debounce = (fn, delay) => {
  let timer;
  const context = this;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, delay);
  };
};

const debouncedFunc = debounce(search, 2000);

const searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", (e) => {
  debouncedFunc(e);
});
