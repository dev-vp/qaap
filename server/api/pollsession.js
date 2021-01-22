const {Poll, PollSession} = require('../db')
const router = require('express').Router()

// GET requests to /api/session/:sessionKey/
router.get('/:sessionKey', async function(req, res, next) {
  try {
    const session = await PollSession.findAll({
      raw: true,
      where: {
        sessionId: req.params.sessionKey
      }
    })

    const data = await Poll.findAll({
      where: {
        pollSessionId: session[0].id
      },
      include: {
        model: PollSession,
        where: {
          sessionId: req.params.sessionKey
        }
      }
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// PUT requests to /api/session/:sessionKey/
router.put('/:sessionKey', async function(req, res, next) {
  try {
    let {id} = await PollSession.findOne({
      where: {
        sessionId: req.params.sessionKey
      }
    })

    let currentSession = await Poll.findOne({
      where: {
        pollSessionId: id
      }
    })

    await currentSession.update(req.body)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// DELETE requests to /api/session/:sessionKey/
router.delete('/:sessionKey', async function(req, res, next) {
  try {
    let currentSession = await PollSession.findOne({
      where: {
        sessionId: req.params.sessionKey
      }
    })

    let targetPoll = await Poll.findOne({
      where: {
        pollSessionId: currentSession.id
      }
    })

    await currentSession.destroy()
    await targetPoll.destroy()

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// POST requests to /api/session/
router.post('/', async function(req, res, next) {
  const {pollSession} = req.body
  const {
    title,
    chartType,
    question,
    option1,
    vote1,
    option2,
    vote2,
    option3,
    vote3,
    option4,
    vote4,
    option5,
    vote5
  } = req.body
  try {
    let newSession = await PollSession.create({sessionId: pollSession})

    const pollData = {
      title,
      chartType,
      question,
      option1,
      vote1,
      option2,
      vote2,
      option3,
      vote3,
      option4,
      vote4,
      option5,
      vote5,
      pollSessionId: newSession.id
    }

    let newPoll = await Poll.create(pollData)

    // await Poll.prototype.setPollSession(newSession)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router

/* CORRECT JSON Data Structure for PUT Request ('/api/session'): Tested/Confirmed with POSTMAN
** REACT Component State Should be in the same format as below.
-----------------------------------------------------------------
{
  "title": "test poll",
  "chartType": "bar",
  "question": "Test",
  "option1": "option1",
  "vote1": 0,
  "option2": "option2",
  "vote2": 8,
  "option3": "option3",
  "vote3": 5,
  "option4": null,
  "vote4": 0,
  "option5": null,
  "vote5": 0,
  "pollSession": {
      "id": 1,
      "sessionId": "202107291830"
  }
}
*/
