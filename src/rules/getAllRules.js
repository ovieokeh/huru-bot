const { rulesURL } = require('./urls')
const { http } = require('../helpers')

async function getAllRules(token) {
  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token,
    },
  }

  const response = await http.get(requestConfig)

  if (response.statusCode !== 200) {
    throw new Error(response.body)
  }

  return JSON.parse(response.body)
}

module.exports = getAllRules
