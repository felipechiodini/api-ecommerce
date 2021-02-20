const express = require('express')
const router = express.Router()
const model = require('../models/coupon')
const jwt = require('jsonwebtoken')

router.get('/cupon',  (req, res) => {
    model.listCoupon(req).then(result => {
        res.json(result)
    })
})

router.put('/cupon', (req, res) => {
    model.saveCoupon(req).then(result => {
        res.json(result)
    })
})

router.post('/cupon/:id', (req, res) => {
    model.editCoupon(req).then(result => {
        res.json(result)
    })
})

router.delete('/cupon/:id', (req, res) => {
    model.deleteCoupon(req).then(result => {
        res.json(result)
    })
})

module.exports = router