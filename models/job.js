var connection = require('../db-connection')

const model = {}

const getListJob = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT a.id, a.id_address, a.active, a.name, a.requirements, a.activities, a.differential, b.name FROM job AS a LEFT JOIN role AS b ON b.id = a.id_role"
        connection.query(sql, (err, rows) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

const getAddressJob = (row) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM address WHERE id = " + row.id_address
        connection.query(sql, (err, rows) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

const saveJob = (data) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO job(id_address, id_role, active, name, requirements, activities, differential)
        VALUES(${data.id_address}, ${data.id_role}, ${data.active}, '${data.name}', '${data.requirements}', '${data.activities}', '${data.differential}')`

        connection.query(sql, (err, rows) => {
            if(err)
                reject(err)

            const result = {
                status: 'error',
                message: 'Falha ao tentar inserir vaga.'
            }

            if(rows.affectedRows > 0) {
                result.status = 'success'
                result.message = 'Vaga cadastrada com sucesso.'
            }

            resolve(result)
        })
    })
}

const getListRole = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT id, name FROM role"
        connection.query(sql, (err, rows) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

const deleteJob = (id) => {
    return new Promise((resolve, reject) => {
        sql = `DELETE FROM job WHERE id = ${id}`

        connection.query(sql, (err, rows) => {
            if(err)
                reject(err)

            const result = {
                status: 'error',
                message: 'Falha ao tentar excluir vaga.'
            }

            if(rows.affectedRows > 0) {
                result.status = 'success'
                result.message = 'Vaga excluída com sucesso.'
            }

            resolve(result)
        })
    })
}

model.listRole = () => {
    return new Promise((resolve, reject) => {
        getListRole().then((roles) => {
            resolve(roles)
        })
    })
}

model.listJob = () => {
    return new Promise((resolve, reject) => {
        getListJob().then(async (jobs) => {
            for(let job of jobs) {
                await getAddressJob(job).then((address) => {
                    job.address = address
                })
            }
            resolve(jobs)
        })
    })
}

model.saveJob = (req) => {
    return new Promise((resolve, reject) => {
        saveJob(req.body).then((result) => {
            resolve(result)
        })
    })
}

model.editJob = (req) => {
    let sql = `UPDATE coupon SET active = ${req.body.active}, name = "${req.body.active}", code = "${req.body.active}", discount = ${req.body.active} WHERE id = ${req.params.id}`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

model.deleteJob = (req) => {
    return new Promise(async (resolve) => {
        qtdSuccess = 0
        for (const id of req.body.ids) {
            await deleteJob(id).then((result) => {
                if(result.status == 'success')
                    qtdSuccess++
            })
        }

        const result = {
            status: 'success'
        }

        if(qtdSuccess != 1)
            result.message = 'Foram removidas ' + qtdSuccess + ' vagas.'
        else 
            result.message = 'Foi removida ' + qtdSuccess + ' vaga.'

        resolve(result)
    })
}

module.exports = model
