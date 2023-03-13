const router = require('express').Router();
const { Post } = require('../../models');
const isAuth = require("../../utils/auth");

// this will render the page
router.post('/', async (req,res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// this will delete a post
router.delete('/', isAuth, async (req,res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (postData) {
            res.status(200).json(postData);
        } else {
            res.status(404).json({message: "your search for " + req.params.id + " could not be found in the system."});
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;

