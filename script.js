function getPolynom(...args) {
  console.log(args);
  if (!args.length) {
    return null;
  }

  const functions = [];
  [args].reverse().forEach((element, index) => {
    functions.push((x) => ((index >= 1) ? element * x ** index : element));
  });
  return (x) => functions.reduce((acc, value) => acc + value(x), 0);
}


console.log(getPolynom()(3));
