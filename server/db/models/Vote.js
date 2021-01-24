const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  vote: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Vote
