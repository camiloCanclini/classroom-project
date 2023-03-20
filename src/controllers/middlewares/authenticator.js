const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const pool = require('../../database/db_utils');
const { promisify } = require('node:util');
const { log } = require('node:console');

const secret = process.env.JWT_SECRET


exports.isAuth = (req, res, next) => {
    console.log('cookies del cliente:');
    console.log(req.cookies);
    const token = req.cookies.token_classroom;
    if (!token) {
      console.log('Token No encontrado');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.render('login');
    }
    const verify = promisify(jwt.verify)
    verify(token, secret)
    .then(deco => {
      console.log(deco);
      req.id_user = deco.id;  
      next()
    })
    .catch(err => {
      console.log('Token Incorrecto');
      res.clearCookie('token')
      res.render('login')
    })
};

