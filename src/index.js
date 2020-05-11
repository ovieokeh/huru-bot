const request = require('request')

const getBearerToken = require('./config/getBearerToken')
const { sleep } = require('./helpers')
const { getAllRules, setAllRules, deleteAllRules, rules } = require('./rules')

function streamConnect(token) {
  // Listen to the stream
  const config = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/filter?format=compact',
    auth: {
      bearer: token,
    },
    timeout: 20000,
  }

  const stream = request.get(config)

  stream
    .on('data', (data) => {
      try {
        const json = JSON.parse(data)

        console.log(json)

        if (json.connection_issue) {
          stream.emit('timeout')
        }
      } catch (e) {
        // Heartbeat received. Do nothing.
      }
    })
    .on('error', (error) => {
      if (error.code === 'ESOCKETTIMEDOUT') {
        stream.emit('timeout')
      }
    })

  return stream
}

;(async () => {
  let token, currentRules, stream
  let timeout = 0

  try {
    // Exchange your credentials for a Bearer token
    token = await getBearerToken()
  } catch (e) {
    console.error(
      `Could not generate a Bearer token. Please check that your credentials are correct and that the Filtered Stream preview is enabled in your Labs dashboard. (${e})`,
    )
    process.exit(-1)
  }

  try {
    // Gets the complete list of rules currently applied to the stream
    currentRules = await getAllRules(token)

    // // Delete all rules. Comment this line if you want to keep your existing rules.
    await deleteAllRules(currentRules, token)

    // // Add rules to the stream. Comment this line if you want to keep your existing rules.
    await setAllRules(rules, token)
  } catch (e) {
    console.error(e)
    process.exit(-1)
  }

  // Listen to the stream.
  // This reconnection logic will attempt to reconnect when a disconnection is detected.
  // To avoid rate limites, this logic implements exponential backoff, so the wait time
  // will increase if the client cannot reconnect to the stream.
  const connect = () => {
    try {
      stream = streamConnect(token)
      stream.on('timeout', async () => {
        // Reconnect on error
        console.warn('A connection error occurred. Reconnecting…')

        timeout += 1
        stream.abort()

        await sleep(2 ** timeout * 1000)
        connect()
      })
    } catch (e) {
      connect()
    }
  }

  connect()
})()
