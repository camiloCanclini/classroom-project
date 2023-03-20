const dbUtil = require('../../database/db_utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.viewToShow = async (req,res)=>{
    const role = await dbUtil.verifyUserRole(req.id_user)
    console.log(role)
    if (role === 'admin') {
        return res.render('admin/index')
    } else {
        if (role === 'teacher') {
            return res.render('500.ejs')
        }else{
            return res.render('index')
        }
    }
}

exports.login = async(req, res)=>{

    const email = req.body.email;
    const pass = req.body.pass;
    const saveCookie = (typeof req.body.remember !== 'undefined') ? true : false;

    console.log(req.body);

    console.log('saveCookie '+saveCookie);
    if ( !email || !pass ) {
        return res.render('login',{alert:'warning'})
    }else{
        const user = await dbUtil.findUser(email,pass)
        console.log("userExists: ");
        console.log(user);
        if (user.exists) {
            if (saveCookie==true) {
                tokenCookie = jwt.sign({id:user.id, name: user.name},process.env.JWT_SECRET)
                console.log(tokenCookie);
                res.cookie('token_classroom', tokenCookie, {httpOnly: true})
                res.redirect('/')
            }else{
                res.render('index')
            }
        }else{
            res.render('login',{alert:'error'})
        }
    }
    
}
exports.logout = (req,res)=>{
    res.clearCookie('token_classroom');

    // Agregar una nueva entrada en el historial del navegador y reemplazar la URL actual
    res.setHeader('Cache-Control', 'private,  no-cache, no-store, must-revalidate');

    res.redirect('/');
}