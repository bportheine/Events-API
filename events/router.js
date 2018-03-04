const Router = require('express').Router
const {Event} = require('../models')
const Op = require('sequelize').Op

const router = new Router()

const updateEvent = (request, response) => {
  const updates = request.body

  Event.findById(request.params.id)
    .then(entity => {
      return entity.update(updates)
    })
    .then(updatedEvent => {
      response.json(updatedEvent)
    })
    .catch(err => {
      response.status(500).json({ message: err.message })
    })
}

router.get('/events', (request, response) => {
  Event.findAll({
    attributes: ['title', 'startDate', 'endDate'],
    where: {
      startDate: {
        [Op.gte]: new Date()
      }
    }
  })
    .then(result => {
      if (!result) return response.status(404).json({ message: "No events found." })
      response.json(result)
    })
    .catch(err => {
      response.status(500).json({
        message: "Whoops, Something went wrong!"
      })
    })
})

router.get('/events/:id', (request, response) => {
  Event.findById(request.params.id)
    .then(result => {
      if (!result) return response.status(404).json({ message: "Event not found."})
      response.json(result)
    })
    .catch(err => {
      response.status(500).json({ message: "Whoops, Something went wrong!" })
    })
})

router.post('/events', (request, response) => {
  const event = request.body

  Event.create(event)
    .then(entity => {
      response.status(201).json(entity)
    })
    .catch(err => {
      response.status(422).json({ message: err.message })
    })
})

router.put('/events/:id', updateEvent)

router.patch('/events/:id', updateEvent)

router.delete('/events/:id', (request, response) => {
  Event.findById(request.params.id)
    .then(entity => {
      return entity.destroy()
    })
    .then(_ => {
      response.json({ message: 'The event was deleted.' })
    })
    .catch(err => {
      response.status(500).json({ message: err.message })
    })
})

module.exports = router
