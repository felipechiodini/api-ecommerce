var connection = require('../db-connection')

module.exports = new Promise((resolve, reject) => {
    connection.query('SELECT id, code, name, uf FROM cities', (err, rows, fields) => {
        if(err)
            reject(err)
        resolve(rows)
    })
})
