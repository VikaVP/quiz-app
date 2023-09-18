const model = require('../models/quiz')

module.exports = {
    getAll: async (req, res) => {
        try {
            const { page_size, page_number } = req.query
            const result = await model.getAll(page_size, page_number)
            if(result) {
                const total = await model.getTotalRow()
                total && res.status(200).json({
                    status: 200,
                    data: result,
                    total: total[0].records,
                    page_number,
                    page_size,
                    message: 'Success get all quiz data'
                })
            }
            
        } catch (error) {
            console.log(error, 'error get all quiz');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    addQuiz: async (req, res) => {
        try {
            const { title, score, question, option_1, option_2, option_3, option_4, correct_answer, created_by } = req.body
            const getAllScore = await model.getAllScore()
            if((getAllScore[0].total_score + Number(score)) > 100){
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: `Over maximum score (100), remain score is ${100 - getAllScore[0].total_score}`
                })
            } else {
                try {
                    const result = await model.addQuiz({ title, score, question, option_1, option_2, option_3, option_4, correct_answer, created_by })
                    result && res.status(200).json({
                        status: 200,
                        data: { 
                            title,
                            score,
                            question,
                            option_1,
                            option_2,
                            option_3,
                            option_4,
                            correct_answer,
                            created_by
                        },
                        message: 'Success add quiz'
                    })
                } catch (error) {
                    console.log(error, 'error add quiz');
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: error
                    })
                }
            }
        } catch (error) {
            console.log(error, 'error add quiz');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    updateQuiz: async (req, res) => {
        try {
            const { id, title, score, question, option_1, option_2, option_3, option_4, correct_answer, created_by } = req.body
            const getAllScore = await model.getAllScoreForUpdate(id)
            if((getAllScore[0].total_score + Number(score)) >= 100){
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: `Over maximum score (100), remain score is ${100 - getAllScore[0].total_score}`
                })
            } else {
                try {
                    const result = await model.updateQuiz({ id, title, score, question, option_1, option_2, option_3, option_4, correct_answer, created_by })
                    result && res.status(200).json({
                        status: 200,
                        data: { id, title, score, question, option_1, option_2, option_3, option_4, correct_answer, created_by },
                        message: 'Success update quiz'
                    })
                } catch (error) {
                    console.log(error, 'error update quiz');
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: error
                    })
                }
            }
        } catch (error) {
            console.log(error, 'error update quiz');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    deleteQuiz: async (req, res) => {
        try {
            const { id } = req.params
            const result = await model.deleteQuiz(id)
            result && res.status(200).json({
                status: 200,
                data: { id },
                message: 'Success delete quiz'
            })
        } catch (error) {
            console.log(error, 'error delete quiz');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    updateTimerQuiz: async (req, res) => {
        try {
            const { time, created_by } = req.body
            const result = await model.updateTimer({ time, created_by })
            result && res.status(200).json({
                status: 200,
                data: { time, created_by },
                message: 'Success update timer'
            })
        } catch (error) {
            console.log(error, 'error update timer');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    getTimer: async (req, res) => {
        try {
            const result = await model.getTimer()
            result && res.status(200).json({
                status: 200,
                data: result,
                message: 'Success get timer'
            })
        } catch (error) {
            console.log(error, 'error get timer');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    getAllForUser: async (req, res) => {
        try {
            const result = await model.getAllForUser()
            result && res.status(200).json({
                status: 200,
                data: result,
                message: 'Success get all quiz data'
            })
        } catch (error) {
            console.log(error, 'error get all quiz');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    getAnswer: async (req, res) => {
        try {
            const { id } = req.params
            const { answer } = req.query
            const result = await model.getAnswer(id)
            result && res.status(200).json({
                status: 200,
                data: {
                    correct: result[0].correct_answer === answer,
                    score: result[0].score
                },
                message: 'Success get correct answer'
            })
        } catch (error) {
            console.log(error, 'error get correct answer');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },
}