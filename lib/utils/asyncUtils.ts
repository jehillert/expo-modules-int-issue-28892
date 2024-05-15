const exeAsync = (callback: () => void | Error) =>
  Promise.resolve()
    .then(() => callback())
    .then(result => result)
    .catch(err => console.log(err));

const asAsync =
  <T>(callback: (args?: T) => void | Promise<void>) =>
  (args?: T) =>
    Promise.resolve()
      .then(() => callback(args))
      .then(result => result)
      .catch(err => console.log(err));

export { asAsync, exeAsync };
