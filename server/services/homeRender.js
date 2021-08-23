const axios = require('axios');

exports.homeRouter = (req, res) => {
    res.render('home/index');
}

exports.pricingRouter = (req, res) => {
    res.render('home/pricing');
}

exports.webRouter = (req, res) => {
    res.render('home/web-development');
}

exports.loginRouter = (req, res) => {
    res.render('home/login');
}

exports.registerRoute = (req, res) => {
    res.render('home/register');
}

exports.changePassword = (req, res) => {
    res.render('home/change-password');
}