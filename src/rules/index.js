const getAllRules = require('./getAllRules')
const setAllRules = require('./setRules')
const deleteAllRules = require('./deleteAllRules')

const rules = [{ value: 'okeh', tag: 'test tag' }]

module.exports = {
  getAllRules,
  setAllRules,
  deleteAllRules,
  rules,
}
