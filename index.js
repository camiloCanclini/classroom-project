// Library Imports
const express = require('express');
const dotenv = require('dotenv').config();
let ejs = require('ejs');
const path = require('path');

// Vars Configuration
const app = express()
const portServer = process.env.SERVER_PORT_DEV;

// Express Configuration
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.listen(portServer,()=>{
    console.log('Server in port: http://localhost:'+ portServer)
})