const myCar = {
  brand: "Ferrari",
  color: "red"
};

function carInfo(currency, price, ...args) {
  console.log(
    `I bought a ${this.brand} car in ${this.color} at ${currency} ${price} ${args}`
  );
}

// const bindedFunc = carInfo.bind(myCar, "$", 50000);
// bindedFunc();

Function.prototype.myBind = function (context = {}, ...args) {
  return (...newArgs) => {
    this.call(context, ...args, ...newArgs);
  };
};

const bindedFunc = carInfo.myBind(carInfo, "$", 75000);
bindedFunc();
