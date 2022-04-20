const Post = require("../models/postsModel")

exports.getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find();
        res.status(200).json({
            status: "success",
            result: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
        })
    }
};

exports.getOnePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
        })
    }
};

exports.createPost = async (req, res) => {

    try {
        const post = await Post.create(req.body);
        res.status(201).json({
            status: "created",
            data: {
                post
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
        })
    }
};

exports.updatePost = async (req, res) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "updated",
            data: {
                post
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
        })
    }
};

exports.deletePost = async (req, res) => {

    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "deleted",
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
        })
    }
};