var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id: ObjectId,
    first_name: String,
    last_name: String,
    email_address: String,
    career: String
});

// to access model 'users' - name of collection, UserSchema - fields defined above
var UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;