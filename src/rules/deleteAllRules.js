const { rulesURL } = require('./urls')
const { http } = require('../helpers')

async function deleteAllRules(rules, token) {
  if (!Array.isArray(rules.data)) {
    return null
  }

  const ids = rules.data.map((rule) => rule.id)

  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token,
    },
    json: {
      delete: {
        ids,
      },
    },
  }

  const response = await http.post(requestConfig)

  if (response.statusCode !== 200) {
    throw new Error(JSON.stringify(response.body))
  }

  return response.body
}

module.exports = deleteAllRules
