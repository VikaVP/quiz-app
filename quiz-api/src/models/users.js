const conn = require('../configs/connection')

module.exports = {
    getAll: (page_size, page_number) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT SQL_CALC_FOUND_ROWS * FROM users LIMIT ${page_size} OFFSET ${(page_number - 1) * page_size}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getTotalRow: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT FOUND_ROWS() as records`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    addUsers: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO users (username, email, password, role) VALUES ('${data.username}', '${data.email}', '${data.password}', '${data.role}')`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    updateUsers: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE users SET username='${data.username}', email='${data.email}', password='${data.password}', role='${data.role}' WHERE id='${data.id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    deleteUsers: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM users WHERE id='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
}