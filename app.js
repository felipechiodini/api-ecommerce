const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

require("dotenv-safe").config({
    allowEmptyValues: true,
    silent: true
})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    
    if (!token)
        return res.status(401).json({ auth: false, message: 'No token provided.' })

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err)
        return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
        
        req.userId = decoded.id;
        next();
    });
}


const app = express()
const port = 3000

const authentication = require('./routes/authentication')
const jobRouter = require('./routes/job')
const couponRouter = require('./routes/coupon')


app.use(function (req, res, next) {
    // if(req.originalUrl != '/login')
        // verifyJWT(req, res, next)
    next();
});



app.use(bodyParser.json())
app.use(cors())


app.use('/', authentication)
app.use('/', couponRouter)
app.use('/', jobRouter)


app.listen(port)