const express = require('express');
const router = express.Router()
const auth = require('../controllers/middlewares/authenticator');
const dbUtil = require('../database/db_utils');

// User enters the application - If isn't Authorized, It's send's to login page 
router.get('/', auth.isAuth,(req,res)=>{ 
    res.render('index.ejs')
})

router.post('/login', async(req, res)=>{
    let saveCookie = true;

    const email = req.body.email;
    const pass = req.body.pass;
    const remember = req.body.remember;

    console.log(req.body);
    
    if (!remember) {
        saveCookie = false;
    }
    if ( !email || !pass ) {
        return res.render('login',{alert:'warning'})
    }else{
        const userExists = await dbUtil.findUser(email,pass)
        console.log("userExists: "+userExists);
        if (userExists) {
            res.render('index')
        }else{
            res.render('login',{alert:'error'})
        }
    }
    //res.render('login')
})


module.exports = router