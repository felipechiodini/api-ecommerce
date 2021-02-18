var connection = require('../db-connection')

const listCoupon = (req) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id, active, name, code, discount FROM coupon', (err, rows, fields) => {
            if(err)
                reject(err)
            resolve(rows)
        })
    })
}

const editCoupon = (req) => {
    let sql = "UPDATE coupon SET  WHERE id = " + req.params.id

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows, fields) => {
            if(err)
                reject(err)

            let result
            if(rows.affectedRows > 0 )
                result = {code: 200, message: 'Cupom excluido com sucesso!'}
            else 
                result = {code: 200, message: 'Nenhum cupom encontrado'}

            resolve(result)
        })
    })
}

const deleteCoupon = (req) => {
    let sql = "DELETE FROM coupon WHERE id = " + req.params.id

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows, fields) => {
            if(err)
                reject(err)

            let result
            if(rows.affectedRows > 0 )
                result = {code: 200, message: 'Cupom excluido com sucesso!'}
            else 
                result = {code: 200, message: 'Nenhum cupom encontrado'}

            resolve(result)
        })
    })
}

module.exports = {
    listCoupon,
    editCoupon,
    deleteCoupon,
}
