const db = require('./db')
const Poll = require('./models/Poll')
const Option = require('./models/Option')
const SessionKey = require('./models/SessionKey')
const Vote = require('./models/Vote')

Poll.belongsTo(SessionKey)

Poll.hasMany(Option)
Option.belongsTo(Poll)

Vote.belongsTo(Option)

module.exports = {
  db,
  Poll,
  Option,
  SessionKey,
  Vote
}
