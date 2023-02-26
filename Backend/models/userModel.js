const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    "name" : String,
    "email" : String,
    "gender" : String,
    "mobile" : String,
    "password" : String,
    "dob" : String
})
const UserModel = mongoose.model("users", userSchema);

module.exports = {UserModel}
