const express = require('express');
const router = express.Router()
const auth = require('../controllers/middlewares/authenticator');
const userHandler = require('../controllers/handlers/user_controller');

// User enters the application - If isn't Authorized, It's send's to login page 
router.get('/', auth.isAuth,userHandler.viewToShow)

router.post('/login', userHandler.login)

router.get('/logout', userHandler.logout)

module.exports = router