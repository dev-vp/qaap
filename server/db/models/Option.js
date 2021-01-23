const Sequelize = require('sequelize')
const db = require('../db')

const Option = db.define('option', {
  option: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
})

module.exports = Option
