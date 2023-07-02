function getCommonDirectoryPath(pathes) {
  const changedPathes = pathes.map((path) => path.split('/'));

  const commonPath = [];
  let isCommonPartPath = true;
  for (let i = 0; i < changedPathes[0].length && isCommonPartPath; i += 1) {
    const commonPartPath = changedPathes[0][i];
    for (let j = 0; j < changedPathes.length && isCommonPartPath; j += 1) {
      if (commonPartPath !== changedPathes[j][i]) {
        isCommonPartPath = false;
      }
    }

    if (isCommonPartPath) {
      commonPath.push(commonPartPath);
    }
  }

  return commonPath.length ? `${commonPath.join('/')}/` : '';
}

console.log(getCommonDirectoryPath(['/web/images/image1.png', '/web/images/image2.png']));
