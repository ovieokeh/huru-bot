require('dotenv').config();

const consumerKey = process.env.consumer_key;
const consumerSecret = process.env.consumer_secret;

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');

const requestConfig = {
  url: bearerTokenURL,
  auth: {
    user: consumerKey,
    pass: consumerSecret,
  },
  form: {
    grant_type: 'client_credentials',
  },
};

module.exports = requestConfig;
