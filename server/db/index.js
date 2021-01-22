const db = require('./db')
const Poll = require('./models/Poll')
const PollSession = require('./models/PollSession')

Poll.belongsTo(PollSession)

module.exports = {
  db,
  Poll,
  PollSession
}
