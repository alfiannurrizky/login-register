const router = require('express').Router()
const userController = require('../controllers/userController')
const { validateRegister, validateLogin } = require('../validations/index')


router.post('/api/register',validateRegister(), userController.register)
router.post('/api/login',validateLogin(), userController.login)

module.exports = router