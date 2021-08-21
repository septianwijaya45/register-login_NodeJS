const express = require('express');
const { homeRouter, pricingRouter, webRouter, loginRouter, registerRoute } = require('../services/homeRender');
const router = express.Router();
const userRegisterController = require('../controller/userRegisterController');

router.get('/', homeRouter);
router.get('/pricing', pricingRouter);
router.get('/web-development', webRouter);
router.get('/login', loginRouter);
router.get('/register', registerRoute);


// API
router.post('/api/register', userRegisterController.register);

module.exports = router;