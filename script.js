function memoize(func) {
  const savedNumber = func();
  return () => savedNumber;
}

const memoizer = memoize(() => Math.random());
console.log(memoizer());
console.log(memoizer());
console.log(memoizer());
console.log(memoizer());
console.log(memoizer());
