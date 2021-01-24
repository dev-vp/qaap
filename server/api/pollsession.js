const {Poll, Option, SessionKey, Vote} = require('../db')
const router = require('express').Router()

// GET requests to /api/session/:sessionKey/
router.get('/:sessionKey', async function(req, res, next) {
  try {
    const session = await SessionKey.findOne({
      raw: true,
      where: {
        sessionKey: req.params.sessionKey
      }
    })

    const poll = await Poll.findAll({
      where: {
        id: session.pollId
      },
      include: {
        model: Option,
        where: {
          pollId: session.pollId
        },
        include: {
          model: Vote,
          where: {
            pollId: session.pollId
          }
        }
      }
    })

    res.json(poll)
  } catch (error) {
    next(error)
  }
})

// POST requests to /api/session/
router.post('/', async function(req, res, next) {
  const {pollSession, poll, options} = req.body

  try {
    let newSession = await SessionKey.create({sessionKey: pollSession})
    let newPoll = await Poll.create(poll)
    await newPoll.setSessionkey(newSession.id)
    for (let i = 0; i < options.length; i++) {
      const newOpt = await Option.create(options[i])
      await newOpt.setPoll(newPoll.id)
      const newVote = await Vote.create()
      await newOpt.setVote(newVote.id)
      await newVote.setPoll(newPoll.id)
    }

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

/* BELOW ARE UNECESSARY ROUTES FOR THE TIME BEING */
/*
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
    const targetSession = await SessionKey.findOne({
      where:{
        sessionKey: req.params.sessionKey,
      }
    })

    await Option.destroy({
      where: {
        pollId: targetSession.pollId
      },
    })

    // await Vote.destory({
    //   where: {
    //     pollId: targetSession.pollId
    //   }
    // })

    await Poll.destroy({
      where: {
        id: targetSession.pollId
      },
    })

    await SessionKey.destroy({
      where: {
        sessionKey: req.params.sessionKey
      }
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
*/

module.exports = router
