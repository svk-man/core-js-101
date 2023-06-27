function swapHeadAndTail(arr) {
  if (arr.length === 1) {
    return arr;
  }

  const middleIndex = Math.floor(arr.length / 2);
  if (arr.length - middleIndex * 2) {
    console.log(Math.floor(arr.length / 2));
    return arr.slice(middleIndex + 1)
      .concat([arr[middleIndex]], arr.slice(0, middleIndex));
  }

  return arr.slice(middleIndex)
    .concat(arr.slice(0, middleIndex));
}

console.log(swapHeadAndTail([1, 2, 3]));
