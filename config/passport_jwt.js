const passport = require('passport'); //requiring passport
const JWTStrategy = require('passport-jwt').Strategy; //jwt strategy
const ExtractJWT = require('passport-jwt').ExtractJwt; //extracting the jwt token
const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp', //secret key used to encrypt/decrypt
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {
    Doctor.findById(jwtPayLoad._id, function(err, doctor) {
        if(err) {
            //if error occured
            console.log('Error in finding user --> Passport JWT');
            return done(err);
        }
        if(doctor) {
            //if doctor found
            return done(null, doctor);
        }else {
            //if doctor not found
            return done(null, false);
        }
    })
}));

module.exports = passport;