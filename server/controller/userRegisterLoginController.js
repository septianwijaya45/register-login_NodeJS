const bcrypt = require('bcryptjs');
const user = require('../model/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'aadsjnasdlaksndliuno120p847^%&^1nbkb^*812*)_(_)ndlasjdu1'

exports.register = async (req, res) => {
    // bcrypt, md5, shal, sha256, sha512

    // 1. The Collision should be improbable
    // 2. The algorithm should be slow
    // 3. npm i bcryptjs

    const {username, email} = req.body;
    let password = await bcrypt.hashSync(req.body.password, 10);

    if(!username || typeof username !== "string"){
        res.status(400).send({
            message: "Username Must Be Entered!"
        })
    }
    
    if(!email){
        res.status(400).send({
            message: "Email Must Be Entered!"
        })
    }
    
    if(!password || typeof password !== 'string'){
        res.status(400).send({
            message: "Password Must Be Entered!"
        })
    }

    if(password.length < 8){
        res.status(400).send({
            message: "Password too small. Should be atleast 6 Characters!"
        })
    }
    if(!password || typeof password !== 'string'){
        res.status(400).send({
            message: "Password Must Be Entered!"
        })
    }


    try{
        const response = await user.create({
            username,
            email,
            password
        });

        res.redirect('/login');
    }catch(err) {
        if(err.code == 11000){
            res.send({
                message: err.message || "Duplicate Email! Please Register With Another Email!"
            });

        }
        res.send({
            message: err.message || "Duplicate Email! Please Register With Another Email!"
        });

    }
}

// ***** JWT INTRODUCTION ***** //
// Client => Server: Your client "somehow" as to authentication
// WHY -> Server is a central computer which YOu control
// Client (john) -> a computer which you do not control

// 1. Client proves itself somehow on the secret/data is NON CHANGEABLE (JWT)
// 2. Client-Server share a secret

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const userLogin = await user.findOne({ email }).lean();


    if(!userLogin){
        res.send({
            status: 'error',
            message:  "Invalid Email/Password"
        })
    }

    if(await bcrypt.compare(password, userLogin.password)){
        // the username, password combination is successfully

        const token = jwt.sign({ 
                id: userLogin._id,
                username: userLogin.username
            }, 
            JWT_SECRET
         );

        return res.json({ status: 'ok', data: token});
    }

    res.send({
        status: 'error',
        message: "Invalid Email/Password"
    })
}


// ****** Change-Password ****** //
exports.changePassword = (req, res) => {
    const { token } = req.body;
    const userPassword = jwt.verify(token, JWT_SECRET);

    console.log(user);

    res.json({status: 'ok'})
}