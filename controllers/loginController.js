//js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//Post req that handles register
const registerUser = (req, res) => {
    const { name, password, email, confirm} = req.body;
    if(!name || !password || !email || !confirm) {
        console.log("Fill empty fields");
    }
    //Confirm passwords
    if( password !== confirm) {
        console.log("Password must match");
    } else {
        //Validation
        User.findOne({ email: email }).then((user) => {
            if(user) {
                console.log("email exists");
                res.render("register", {
                    name,
                    password,
                    email,
                });
            } else {
                //Validation
                const newUser = new User({
                    name,
                    password,
                    email,
                });
                //Password Hashing
                bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err)
                        throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(res.redirect("/login"))
                        .catch((err) => console.log(err));
                }))
            }
        })
    }
}

//For Register Page
const registerView = (req, res) => {
    res.render("register", {
    } );
}
// For View
const loginView = (req, res) => {
    res.render("login", {
    } );
}
module.exports =  {
    registerView,
    loginView
};