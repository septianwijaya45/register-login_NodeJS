const express = require('express');
const { homeRouter, pricingRouter, webRouter } = require('../services/homeRender');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeRouter);
router.get('/pricing', pricingRouter);
router.get('/web-development', webRouter);


// API
// router.get('/api', homeController.index);

module.exports = router;