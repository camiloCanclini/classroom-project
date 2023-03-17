const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const pool = require('../../database/db_utils');
const { promisify } = require('node:util');
const { log } = require('node:console');

const secret = process.env.JWT_SECRET


exports.isAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      console.log('Token No encontrado');
      return res.render('login');
    }

    const verify = promisify(jwt.verify)
    verify(token, secret)
    .then(deco => next())
    .catch(err => {
      console.log('Token Incorrecto');
      res.clearCookie('token')
      res.render('login')
    })
};

/*
exports.loginUser = (req, res, next) =>{
    const token = req.cookies.token
    if (token) {
        const verifyToken = promisify(jwt.verify);
        verifyToken(token, secret)
            .then(deco=>console.log(deco))
            .catch(err=>console.log(err))
    }else{
        
    }
}
*/