const conn = require('../configs/connection')

module.exports = {
    getAll: (page_size, page_number) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT SQL_CALC_FOUND_ROWS * FROM quiz LIMIT ${page_size} OFFSET ${(page_number - 1) * page_size}`, (err, result) => {
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

    addQuiz: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO quiz (title, score, question, option_1, option_2, option_3, option_4, correct_answer, created_by) VALUES ('${data.title}', '${data.score}', '${data.question}', '${data.option_1}', '${data.option_2}', '${data.option_3}', '${data.option_4}', '${data.correct_answer}', '${data.created_by}')`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    updateQuiz: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE quiz SET title='${data.title}', score='${data.score}', question='${data.question}', option_1='${data.option_1}', option_2='${data.option_2}', option_3='${data.option_3}', option_4='${data.option_4}', correct_answer='${data.correct_answer}', created_by='${data.created_by}' WHERE id='${data.id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    deleteQuiz: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM quiz WHERE id='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getAllScore: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT SUM(score) AS total_score FROM quiz`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getAllScoreForUpdate: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT SUM(score) AS total_score FROM quiz WHERE id!=${id}`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    updateTimer: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE timer SET time='${data.time}', created_by='${data.created_by}' WHERE id=1`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getTimer: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM timer`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getAllForUser: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, title, score, question, option_1, option_2, option_3, option_4, created_by FROM quiz ORDER BY RAND()`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getAnswer: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, correct_answer, score FROM quiz WHERE id='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
}