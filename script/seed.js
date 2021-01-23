'use strict'

const {db, Poll, Option, SessionKey, Vote} = require('../server/db/')
const {pollData, optionData, sessionData, voteData} = require('./seed-data')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(sessionData.map(session => SessionKey.create(session)))
  await Promise.all(pollData.map(poll => Poll.create(poll)))
  await Promise.all(optionData.map(opt => Option.create(opt)))
  await Promise.all(voteData.map(vote => Vote.create(vote)))

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
