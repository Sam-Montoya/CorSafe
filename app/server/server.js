require('dotenv').config();
const serverController = require('./serverController');
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require('cors');

//Auth0
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(cors());



// ---------------------
// -   Database
// --------------------
massive(process.env.CONNECTIONSTRING).then(DB => {
    app.set('DB', DB);
    console.log('Connection to the database was successful...');
}).catch(err => console.log('FAILED to connect to the database. ' + err));


// --------------------
// -   Auth0
// --------------------
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENTID,
    clientSecret: process.env.AUTH_CLIENTSECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
    let profileData = {
        username: profile.nickname
        , name: profile.displayName
        , email: profile.emails[0].value
        , profilepic: profile.picture
        , auth_id: profile.id
        , role: 'user'
    }
    let DB = app.get('DB');
    serverController.createUser(DB, profileData);
    return done(null, profileData);
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    app.get('DB').find_session_user(user.auth_id).then(user => {
        return done(null, user[0]);
    });
});
app.get('/auth0', passport.authenticate('auth0'));
app.get('/auth0/authenticate', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/#/'
}));
app.get('/auth0/logout', (request, response) => {
    request.logOut();
    return response.redirect(302, 'http://localhost:3000/#/');
});
// ------------------
// -   END
// ------------------



// -----------------------
// -   API CALLS
// ----------------------
app.get('/api/getAllTickets', (request, response) => {
    let DB = app.get('DB');
    serverController.getAllTickets(DB, request, response, request.body);
});
app.post('/api/getUserTickets', (request, response) => {
    let DB = app.get('DB');
    serverController.getUserTickets(DB, request, response, request.body.auth_id);
})
app.post('/api/getTicketById', (request, response) => {
    let DB = app.get('DB');
    serverController.getTicketById(DB, request, response, request.body.ticket_id);
});
app.post('/api/createTicket', (request, response) => {
    let DB = app.get('DB');
    serverController.createTicket(DB, response, request.body);
    
    //SYNTAX
    // let ticketData = {
    //     auth_id: 'auth_id-4'
    //     , subject: 'Subject Reason'
    //     , status: 'Status field'
    //     , tag: 'critical'
    //     , description: 'Desc Field'
    // };
});
app.get('/api/updateTicketStatus/:ticket_id/:auth_id', (request, response) => {
    let DB = app.get('DB');
    let { ticket_id, status } = request.data;
    serverController.updateTicketStatus(DB, request, response, status, request.params.auth_id);

    //SYNTAX
    // let ticketData = {
    //     ticket_id: request.params.ticket_id,
    //     status: "Resolved"
    // }
});
app.post('/api/postComment', (request, response) => {
    let DB = app.get('DB');
    serverController.postComment(DB, request, response, request.body);

    //SYNTAX
    // let comment = {
    //     "user_id": "auth_id-1",
    //     "comment": "A comment from Code"
    // }
});
app.post('/api/getComments', (request,response) => {
    let DB = app.get('DB');
    console.log(request.body.ticket_id)
    serverController.getComment(DB, request, response, request.body.ticket_id);
})
app.get('/api/getUserInfo', (request, response) => {
    response.status(200).send(request.user);
});

// -----------------------
// -   END
// ----------------------



const port = 3030;
app.listen(port, () => console.log('Server is being slammed on port ' + port));