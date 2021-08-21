const bcrypt = require('bcryptjs');
const user = require('../model/user')

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