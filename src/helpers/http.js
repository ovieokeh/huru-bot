const util = require('util')
const request = require('request')

const get = util.promisify(request.get)
const post = util.promisify(request.post)

module.exports = {
  get,
  post,
}
