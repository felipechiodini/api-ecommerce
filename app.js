const express = require('express')
const app = express()
const port = 3000

const couponRouter = require('./routes/coupon')

app.use('/', couponRouter)

app.listen(port)