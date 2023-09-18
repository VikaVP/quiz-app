const conn = require('../configs/connection')

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO users (username, email, password, role) VALUES ('${data.username}', '${data.email}', '${data.password}', '${data.role}')`, (err, result) => {
                if(err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getPassword: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT password from users WHERE email='${email}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getUser: (email, password) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}