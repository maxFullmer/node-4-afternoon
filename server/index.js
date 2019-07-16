require('dotenv').config();
const express = require('express');
const session = require('express-session');
const {SERVER_PORT, SESSION_SECRET} = process.env;
//import middleware
const checkForSession = require('./middlewares/checkForSession.js');
//import endpoint controllers
const swagController = require('./controllers/swagController.js');
const authController = require('./controllers/authController.js');
const cartController = require('./controllers/cartController.js');
const searchController = require('./controllers/searchController.js');

const app = express();
//lets us read JSON from the request body
app.use(express.json());

//lets us create sessions
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// top-level 'imported' middleware
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

//endpoints ( app.request method( url 'path' , controller method))
//get that swag
app.get('/api/swag', swagController.read);
//authorization
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);
//cart
app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);
//search
app.get('/api/search', searchController.search);


app.listen(SERVER_PORT, () => console.log(`Server connected at ${SERVER_PORT}`))