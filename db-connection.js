var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'ecommerce'
})

connection.connect((err) => {
    if(err) {
        console.log('Error when try to connect' + err.stack)
        return
    }
    console.log('Connected')
})

module.exports = connection
