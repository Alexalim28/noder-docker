const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You must provide a username!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "You must provide a password!"]
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;