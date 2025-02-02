const Comment = require('../models/commentModel');

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ recipeId: req.params.recipeId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
