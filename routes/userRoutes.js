const express = require('express')
const router = express.Router()


const {
    registerUser,
    login,
    logout,
    updateUserInfo
} = require('../controllers/userController')

const { userAuth } = require('../middleware/userAuth')

router.post('/login', login)
router.post('/register', registerUser)
router.post('/logout', userAuth, logout)
router.patch('/update-user-info', userAuth, updateUserInfo)

module.exports = router