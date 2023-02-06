export default function usePromiseProgress(promises, callback) {
  let val = 0;
  callback(0);
  for (const prom of promises) {
    prom.then(() => {
      val++;
      callback((val * 100) / promises.length);
    });
  }
  return Promise.all(promises);
}
