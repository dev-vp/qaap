const Sequelize = require('sequelize')
const db = require('../db')

const PollSession = db.define('pollSession', {
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = PollSession
