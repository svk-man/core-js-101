function getDigitalRoot(num) {
  let sum = num.toString().split('').reduce((acc, value) => acc + Number(value), 0);
  if (sum > 9) {
    sum = getDigitalRoot(sum);
  }

  return sum;
}

console.log(getDigitalRoot(12345));
