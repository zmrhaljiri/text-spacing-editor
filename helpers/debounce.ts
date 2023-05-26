// MAX_WRITE_OPERATIONS_PER_MINUTE quota is 2 calls per second
export const debounce = (callback, wait = 500) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}
