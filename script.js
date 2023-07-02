function logger(func, logFunc) {
  return (...args) => {
    logFunc(`${func.name}(${JSON.stringify(args)}) starts`);
    logFunc(`${func.name}(${JSON.stringify(args)}) ends`);

    return func(args);
  };
}

const cosLogger = logger(['expected', 'test', 1], 0);

