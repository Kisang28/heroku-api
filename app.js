const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

require('dotenv').config();

//
const port = process.env.PORT || 8080;

//create express app
const app = express();

//Starting server
const morgan = require('morgan');
app.use(morgan('tiny'));


//Database
require('./initializeDB')();

const db = mongoose.connection;

db.once ('open', () => {
    console.log ("Connected to MongoBD database...");
});

//Middleware
app.use(bodyParser.json());

//routes
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

const ContactsRoute = require ('./routes/Contacts');
const Contacts2Route = require('./routes/Contacts2');

app.use ('/contacts',ContactsRoute);
app.use('/contacts2',Contacts2Route);

//Starting server
app.listen(port, console.log("Listening on port: ", port));