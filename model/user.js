var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdTime: {type: Date, default: new Date()},
    updatedTime: {type: Date, default: new Date()}
});

var User = mongoose.model('users', UserSchema);

module.exports = User;
