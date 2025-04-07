const passport = require('passport')
const localstrategy = require('passport-local').Strategy;
const User = require("./models/User")



passport.use(new localstrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username })


        if (!user) {
            return done(null, false, { message: "incoreect username" })
        }


        const ispasswordmatch = user.password === password;

        if (ispasswordmatch) {
            return done(null, user)
        }

        else {
            return done(null, false, { message: 'incorrect password.' });
        }

    }

    catch(err){
        return done(err)
    }

}))


module.exports = passport