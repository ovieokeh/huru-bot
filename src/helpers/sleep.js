async function sleep(delay) {
  return new Promise(resolve => setTimeout(() => resolve(true), delay))
}

module.exports = sleep
