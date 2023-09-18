const authModel = require('../models/auth')
const JWT = require('jsonwebtoken')
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/
require('dotenv').config()

module.exports = {

  register: (req, res) => {
    const { email, password } = req.body
    const checkEmail = emailRegex.test(email)
    const username = email.split('@')[0]
    const data = { username, email, password, role: 'user' }
    if (checkEmail === true) {
      authModel.register(data)
        .then(result => {
          res.status(200).json({
            status: 200,
            error: false,
            user: {
              username,
              email,
            },
            detail: result,
            message: 'Succeed register account!'
          })
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({
            status: 400,
            error: true,
            message: 'Email already used',
            detail: err
          })
        })
    } else {
      res.status(400).json({
        status: 400,
        error: true,
        message: 'Email invalid'
      })
    }
  },

  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(email, password);
    authModel.getPassword(email)
      .then(result => {
        if (result[0].password === password) {
          authModel.getUser(email, password)
            .then(result => {
              result = result[0]
              if (result) {
                const id = result.id
                const email = result.email
                const role = result.role
                const username = result.username
                const token = JWT.sign({ id, email }, process.env.SECRET, { expiresIn: '24h' })
                res.status(201).json({
                  status: 201,
                  message: 'Succeed login',
                  token,
                  user: { id, email, role, username },
                  detail: 'This token only valid for 24 hour'
                })
              } else {
                res.status(400).json({
                  status: 400,
                  error: true,
                  message: 'Email or Password wrong'
                })
              }
            })
            .catch(err => {
              console.log(err)
              res.status(400).json({
                status: 400,
                error: true,
                message: 'Login Failed',
                detail: err
              })
            })
        } else {
          res.status(400).json({
            status: 400,
            error: true,
            message: 'Password wrong'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({
          status: 404,
          error: true,
          message: 'Account not found'
        })
      })
  },
}