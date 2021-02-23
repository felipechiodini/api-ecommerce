var connection = require('../db-connection')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {

    let sql = `SELECT  id FROM user WHERE login = '${req.body.login}' AND password = '${req.body.password}'`

    connection.query(sql, (err, rows, fields) => {

        if(err)
            return res.status(500).json({auth: false, message: 'Erro no servidor'})

        if(rows[0]) {
            const id = rows.id;
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300
            })

            return res.status(200).json({ auth: true, token: token })
        } else {

            return res.status(200).json({auth: false})
        }
    })
})

router.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

module.exports = router