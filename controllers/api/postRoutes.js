const router = require('express').Router();
const { up } = require('inquirer/lib/utils/readline');
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

router.put('/:id', async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            content: req.body.contents
        }, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!updatePost) {
            res.status(404).json({ message: 'No post found!' });
            return;
        }

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
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
            res.status(404).json({message: "No post was found with that ID!"});
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;

