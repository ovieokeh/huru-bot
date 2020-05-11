const request = require('request');
const util = require('util');

const post = util.promisify(request.post);

const requestConfig = require('./index');

async function getBearerToken() {
  const response = await post(requestConfig);
  const body = JSON.parse(response.body);

  if (response.statusCode !== 200) {
    const error = body.errors.pop();
    throw Error(`Error ${error.code}: ${error.message}`);
  }

  return JSON.parse(response.body).access_token;
}

module.exports = getBearerToken;
