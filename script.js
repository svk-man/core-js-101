function getIdGeneratorFunction(startFrom) {
  let id = startFrom;
  return () => id += 1;
}

const getId4 = getIdGeneratorFunction(4);
const getId10 = getIdGeneratorFunction(10);
console.log(getId4());
console.log(getId10());
