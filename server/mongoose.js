var mongoose = require('mongoose');
var config = require('./config');
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoose.uri);
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('DB connection error: ' + err.toString());
});

db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

var Country = new Schema({
    id: {type: Number, required: true},
    title: { type: String, required: false }
});

var City = new Schema({
    id: {type: Number, required: true},
    title: { type: String, required: false }
});

var User = new Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    country: Country,
    city: City
});

var UserModel = mongoose.model('User', User);


module.exports = {UserModel : UserModel};