const { User } = require('../models')
const crypto = require('crypto')

module.exports = {
    create(req, res) {
        return User.create({
            name: req.body.name,
            email: req.body.email,
            password: crypto.createHash('md5').update(req.body.password).digest("hex")
        })
        .then(res.status(200).json({status : 'success', message : 'User successfully created.'}))
        .catch(error => res.status(400).send(error))
    },

    login(req, res) {
        return User.findOne({
            where: {
                email: req.body.email,
                password: crypto.createHash('md5').update(req.body.password).digest("hex")
            }
        })
        .then(User => {
            if(User){
                res.status(200).json({status : 'success', message : 'Login successfull.', token: 'token ler'})
            } else {
                res.status(200).json({status : 'error', message : 'Invalid login credentials.'})
            }
        })
        .catch(error => res.status(400).send(error))
    }
}