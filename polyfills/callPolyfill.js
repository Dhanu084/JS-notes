const myCar = {
  brand: "Ferrari",
  color: "red"
};

function carInfo(currency, price) {
  console.log(
    `I bought a ${this.brand} car in ${this.color} at ${currency} ${price} `
  );
}

// carInfo.call(myCar, "$", 20000000);

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(`${this} is not callable`);
  }
  context.fn = this;
  context.fn(...args); // do implicit binding
};

carInfo.myCall(myCar, "$", 20000000);
