const express = require('express')
const router = express.Router()
const model = require('../models/job')

router.get('/job',  (req, res) => {
    model.listJob(req).then(result => {
        res.json(result)
    })
})

router.get('/role', (req, res) => {
    model.listRole().then((result) => {
        res.json(result)
    })
})

router.put('/job', (req, res) => {
    model.saveJob(req).then(result => {
        res.json(result)
    })
})

router.post('/job/:id', (req, res) => {
    model.editJob(req).then(result => {
        res.json(result)
    })
})

router.delete('/job', (req, res) => {
    model.deleteJob(req).then(result => {
        res.json(result)
    })
})

module.exports = router