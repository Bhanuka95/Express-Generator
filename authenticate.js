var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config');


exports.local = passport.use(new LocalStrategy(User.authenticate()));

//since we are still using sessions to track user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create token and give it to us
exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

//when passport passes the request message, it will use the strategy, extract information and load
//it on to our request message
exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
    console.log("JWT payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) =>{
        if(err) {
            return done(err, false);
        }
        else if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});

