const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }),
    // new GoogleStrategy(
    //   {
    //     clientID: process.env.googleClientID,
    //     clientSecret: process.env.googleClientSecret,
    //     callbackURL: "/auth/google/callback",
    //     proxy: true
    //   },
    //   (accessToken, refreshToken, profile, done) => {
    //     console.log(profile.email);
    //     User.findOne({ email: profile.email }).then(existingUser => {
    //       if (existingUser) {
    //         done(null, existingUser);
    //       } else {
    //         new User({
    //           //googleId: profile.id,
    //           firstname: profile.givenName,
    //           lastname:profile.familyName,
    //           email: profile.email,
              
    //         })
    //           .save()
    //           .then(user => done(null, user));
    //       }
    //     });
    //   }
    // )
  );
};