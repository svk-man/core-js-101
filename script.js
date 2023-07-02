function processAllPromises(array) {
  return new Promise(((resolve) => {
    const resultArray = [];
    array.forEach((promise) => {
      promise.then((res) => {
        console.log(res);
        if (res >= 1 && res <= 9) {
          resultArray.push(Promise.resolve(res));
        }
      });
    });

    resolve(resultArray);
  }));
}

const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)];
const p = processAllPromises(promises);
p.then((res) => {
  console.log(res); // => [1, 2, 3]
});
