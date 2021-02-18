var connection = require('../db-connection')

const model = {}

model.listCoupon = (req) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id, active, name, code, discount FROM coupon', (err, rows, fields) => {
            if(err)
                reject(err)
            resolve(rows)
        })
    })
}

model.saveCoupon = (req) => {
    let sql = `INSERT INTO coupon(active, name, code, discount) VALUE(${req.body.active}, "${req.body.name}", "${req.body.code}", ${req.body.discount})`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows, fields) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

model.editCoupon = (req) => {
    let sql = `UPDATE coupon SET active = ${req.body.active}, name = "${req.body.active}", code = "${req.body.active}", discount = ${req.body.active} WHERE id = ${req.params.id}`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows, fields) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

model.deleteCoupon = (req) => {
    let sql = "DELETE FROM coupon WHERE id = " + req.params.id

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows, fields) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

module.exports = model
