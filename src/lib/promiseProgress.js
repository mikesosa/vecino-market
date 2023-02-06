export default function promiseProgress(promises, callback) {
  let val = 0;
  callback(0, 0);
  for (const prom of promises) {
    prom.then(() => {
      val++;
      callback((val * 100) / promises.length, val);
    });
  }
  return Promise.all(promises);
}
