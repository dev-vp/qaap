const db = require('./db')
const Poll = require('./models/Poll')
const Option = require('./models/Option')
const SessionKey = require('./models/SessionKey')
const Vote = require('./models/Vote')

Poll.hasOne(SessionKey)
Poll.hasMany(Option)
Poll.hasMany(Vote)
Option.belongsTo(Poll)
Vote.belongsTo(Poll)
Option.hasOne(Vote)

module.exports = {
  db,
  Poll,
  Option,
  SessionKey,
  Vote
}
