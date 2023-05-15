const router = require('express').Router()
const userController = require('../controllers/userController')
const { validateRegister, validateLogin } = require('../validations/index')
const multer = require('multer')

router.post('/api/register', multer().none(),validateRegister(), userController.register)
router.post('/api/login', multer().none(),validateLogin(), userController.login)

module.exports = router