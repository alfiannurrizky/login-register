const { body } = require('express-validator')

const validateRegister = () => {

    return [
        body('email').notEmpty().withMessage('the email field is required!').isEmail().withMessage('must be type of email!'),
        body('name').notEmpty().withMessage('the name field is required'),
        body('password').notEmpty().withMessage('the password field is required!').isLength({ min: 8}).withMessage('at least min 8 characters')
    ]
}

const validateLogin = () => {

    return [
        body('email').notEmpty().withMessage('the email field is required!').isEmail().withMessage('must be type of email!'),
        body('password').notEmpty().withMessage('the password field is required!')
    ]
}

module.exports = { validateRegister, validateLogin }
