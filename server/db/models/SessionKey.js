const Sequelize = require('sequelize')
const db = require('../db')

const SessionKey = db.define('sessionkey', {
  sessionKey: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = SessionKey
