var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');

var mongoDB = "mongodb://localhost:27017/emo_rec";

app.use(cors());
app.use(bodyParser.json())

app.listen(3000, function() {
    console.log("Listening on port 3000..");
});


mongoose.connect(mongoDB, function(err, res) {
    if (err) {
        console.log("Error --> "+ err);
    }
    else {
        console.log("Succeeded DB connection");
    }
});

app.post("/", function(req, res) {
    var user = {
        email: req.body.email
    }
    var result = mongoose.connection.collection('users').insert(user, function(result, err) {
        if (!err) {
            return "INSERTED";
        }
        else {
            return err;
        }
    });
    res.send(result);
});