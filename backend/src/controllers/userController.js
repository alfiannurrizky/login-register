const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { validationResult } = require('express-validator')
require('dotenv').config()


const register = async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({
            'success': false,
            'errors': errors.array()
        })
    }

    const checkEmailAlreadyTaken = await User.findOne({ where: {email: req.body.email}})

    if(checkEmailAlreadyTaken)
    {
        return res.status(400).json({
            'success': false,
            'message' : 'email is already taken!'
        })
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(req.body.password, salt)

    const user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: passwordHash,
    })

    return res.status(201).json({
        'success': true,
        'message': 'register successfully'
    })
}

const login = async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({
            'success': false,
            'errors': errors.array()
        })
    }

    const user = await User.findOne({ where: {email: req.body.email}})

    if(!user)
    {
        return res.status(401).json({
            'success': false,
            'message': 'user not found!'
        })
    }

    const passwordCompare = await bcrypt.compare(req.body.password, user.password)

    if(user && passwordCompare)
    {
        const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            'success': true,
            'message': 'login successfully',
            'token': token
        })
    }

    return res.status(401).json({
        'success': false,
        'message': 'email or password is wrong!',
    })

}
module.exports = {
    register,
    login
}