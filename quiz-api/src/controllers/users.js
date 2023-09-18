const model = require('../models/users')

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
                    message: 'Success get all user data'
                })
            }
        } catch (error) {
            console.log(error, 'error get all all user');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    addUsers: async (req, res) => {
        try {
            const { username, email, password, role } = req.body
            const result = await model.addUsers({ username, email, password, role })
            result && res.status(200).json({
                status: 200,
                data: { username, email, password, role },
                message: 'Success add users data'
            })
        } catch (error) {
            console.log(error, 'error add users');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    updateUsers: async (req, res) => {
        try {
            const { id, username, email, password, role } = req.body
            const result = await model.updateUsers({ id, username, email, password, role })
            result && res.status(200).json({
                status: 200,
                data: { id, username, email, password, role },
                message: 'Success update user data'
            })
        } catch (error) {
            console.log(error, 'error update user');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    },

    deleteUsers: async (req, res) => {
        try {
            const { id } = req.params
            const result = await model.deleteUsers(id)
            result && res.status(200).json({
                status: 200,
                data: { id },
                message: 'Success delete user data'
            })
        } catch (error) {
            console.log(error, 'error delete user');
            res.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        }
    }

}