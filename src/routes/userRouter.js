const express = require('express');
const router = express.Router()

router.post('/login',(req, res)=>{
    res.send('Usuario Logueado!')
})

module.exports = router