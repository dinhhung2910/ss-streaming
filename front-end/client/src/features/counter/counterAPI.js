// A mock function to mimic making an async request for data
/**
 *
 * @param {*} amount
 * @return {*}
 */
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({data: amount}), 500),
  );
}
