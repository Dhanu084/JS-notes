const myCar = {
  brand: "Ferrari",
  color: "red"
};

function carInfo(currency, price) {
  console.log(
    `I bought a ${this.brand} car in ${this.color} at ${currency} ${price} `
  );
}

// carInfo.apply(myCar, ["$", 200000]);

Function.prototype.myApply = function (...args) {
  const context = args.shift() || {};
  context.fn = this;

  context.fn(...args[0]); // do implicit binding
};

carInfo.myApply(myCar, ["$", 600000]);
