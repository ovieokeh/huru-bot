const { rulesURL } = require('./urls')
const { http } = require('../helpers')

async function setRules(rules, token) {
  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token,
    },
    json: {
      add: rules,
    },
  }

  const response = await http.post(requestConfig)

  if (response.statusCode !== 201) {
    throw new Error(JSON.stringify(response.body))
  }

  return response.body
}

module.exports = setRules
