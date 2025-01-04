const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const Users = require('../models/Users');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ?
        '.env.production' :
        '.env.development'
});

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/github/callback"
    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            let user = await Users.findOne({ githubId: profile.id });
            if (!user) {
                user = new Users({ githubId: profile.id, username: profile.username });
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await Users.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});