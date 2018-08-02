const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const passportLocalMongoose = require('passport-local-mongoose');

//Create the user schema.
const userSchema = new mongoose.Schema({});

//use plugin Passport local for storing the passwords in hashed format along with the salt.
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//Export the schema so it can be used by the controllers.
module.exports = mongoose.model('User', userSchema);
