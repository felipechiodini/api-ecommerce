var connection = require('../db-connection')

module.exports = new Promise((resolve, reject) => {
    connection.query('SELECT id, uf_code, name, uf, region FROM states', (err, rows, fields) => {
        if(err)
            reject(err)
        resolve(rows)
    })
})
