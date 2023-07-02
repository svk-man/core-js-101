function chainPromises(array, action) {
  const results = [];

  let rest = array.length;

  return new Promise((resolve) => {
    array.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = result;
          rest -= 1;
          if (rest === 0) resolve(results.reduce(action));
        });
    });
  });
}

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(125), Promise.resolve(-123)];
const p = chainPromises(promises, (a, b) => a + b);
p.then((res) => {
  console.log(res); // => 6
});
