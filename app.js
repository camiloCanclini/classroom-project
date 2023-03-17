// Library Imports
const express = require('express');
const dotenv = require('dotenv').config();
let ejs = require('ejs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const cookieParser = require('cookie-parser')

// Vars Configuration
const app = express()
const portServer = process.env.SERVER_PORT_DEV;

// Express Configuration
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

// Routes Configuration
app.use('/',require('./src/routes/userRouter.js')) // Users Routes
app.use(require('./src/controllers/handlers/404')); // Unrecognized Route (404)

app.listen(portServer, () => console.log('Server in port: http://localhost:'+ portServer))