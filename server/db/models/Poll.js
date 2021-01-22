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
  },
  option1: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  vote1: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  option2: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  vote2: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  option3: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  vote3: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  option4: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  vote4: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  option5: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  vote5: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Poll
