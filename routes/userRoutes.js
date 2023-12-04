const express = require('express')
const router = express.Router()


const {
    registerUser,
    login,
    logout
} = require('../controllers/userController')

const { userAuth } = require('../middleware/userAuth')

router.post('/login', login)
router.post('/register', registerUser)
router.post('/logout', userAuth, logout)


module.exports = router