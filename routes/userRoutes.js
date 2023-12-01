const express = require('express')
const router = express.Router()


const {
    registerUser,
    login,
    logout
} = require('../controllers/userController')

const { userAuth } = require('../middleware/userAuth')


// router.get('/', authAdmin, getAdmins)
router.post('/login', login)
router.post('/register', registerUser)
router.post('/logout', userAuth, logout)
// router.put('/:id', authSuperAdmin, updateAdmin)
// router.delete('/:id', authSuperAdmin, deleteAdmin)

module.exports = router