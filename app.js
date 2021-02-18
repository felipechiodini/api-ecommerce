const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const couponRouter = require('./routes/coupon')

app.use(bodyParser.json());
app.use('/', couponRouter)

app.listen(port)