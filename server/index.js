var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');

var mongoDB = "mongodb://localhost:27017/emo_rec";
var globalDB;

app.use(cors());
app.use(bodyParser.json())

// listening on port 3000
app.listen(3000, function() {
    console.log("Listening on port 3000..");
});

// testing connection to the db
mongoose.connect(mongoDB, function(err, db) {
    if (err) {
        console.log("Error --> "+ err);
    }
    else {
        globalDB = db;
        console.log("Succeeded DB connection");
    }
});

// endpoint for inserting a user email to the db
app.post("/", function(req, res) {
    var user = {
        email: req.body.email
    }
    globalDB.collection('users').insert(user, function(err, result) {
        if (!err) {
            res.send("ok");
        }
        else {
            res.send("error");
        }
    });
});


// endpoint for checking the existence of a user email (before saving the newly entered email)
app.post("/user", function(req, res) {
    globalDB.collection('users').find({ email: req.body.email }).toArray(function(err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            res.send("error");
        }
    });
});