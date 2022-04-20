const mongoose =require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Your post must have a title!"]
    },
    body: {
        type: String,
        required: [true, "Your post cannot be empty!"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;