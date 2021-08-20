const axios = require('axios');

exports.homeRouter = (req, res) =>{
    res.render('home/index');
}

exports.pricingRouter = (req, res) =>{
    res.render('home/pricing');
}

exports.webRouter = (req, res) =>{
    res.render('home/web-development');
}