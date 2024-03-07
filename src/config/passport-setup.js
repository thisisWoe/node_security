const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
        clientID: '648451028296-ehbim0ik0komirknejf6t9pnhbm3mbs8.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/api/oauth"
    },
    (accessToken, refreshToken, profile, done) => {
        // Qui, puoi salvare i dettagli dell'utente nel tuo database, se necessario
        console.log('profile', profile);
        done(null, profile);
    }));


// module.exports = {registerGoogleOauth};