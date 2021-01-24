const Sequelize = require('sequelize')
const db = require('../db')

const Poll = db.define('poll', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    valdiate: {
      notEmpty: true
    }
  },
  chartType: {
    type: Sequelize.ENUM('bar', 'pie'),
    defaultValue: 'pie'
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null
  }
})

module.exports = Poll
