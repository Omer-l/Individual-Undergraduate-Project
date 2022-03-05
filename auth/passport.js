//js
const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
//Load model
const User = require("../models/User");
const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            //Check user
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        consol.elog("wrong email");
                        return done();
                    }
                    //Match Password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if(error) throw error;


                        if(isMatch) {
                            return done(null, user);
                        } else {
                            console.log("Wrong password");
                            return done();
                        }
                    });
                });
            .catch((error) => console.log(error))
        })
    )
}