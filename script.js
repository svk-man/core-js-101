function evaluateTicTacToePosition(position) {
  const combs = [
    [[0, 0], [1, 0], [2, 0]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 0], [0, 1], [0, 2]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  let isWinner = false;
  let player;
  for (let i = 0; i < combs.length && !isWinner; i += 1) {
    const firstElement = position[combs[i][0][0]][combs[i][0][1]];
    const secondElement = position[combs[i][1][0]][combs[i][1][1]];
    const thirdElement = position[combs[i][2][0]][combs[i][2][1]];
    console.log(firstElement + secondElement + thirdElement);
    console.log(firstElement === secondElement && secondElement === thirdElement);
    isWinner = firstElement === secondElement && secondElement === thirdElement
      && firstElement !== undefined;
    player = isWinner ? firstElement : undefined;
  }

  return player;
}


console.log(evaluateTicTacToePosition([['X', '0', 'X'],
  ['X', '0', 'X'],
  ['0', 'X', '0']]));
