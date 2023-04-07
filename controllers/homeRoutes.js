const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

router.get('/', async (req,res) => {
    console.log("Get All Posts")
    try {
        const postData = await Post.findAll({
            include: [ User ]
        });

        const posts = postData.map((post) =>
        post.get({ plain:true })
        );

        res.render("homepage", {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [ User ],
                },
            ],
        });
        if(postData) {
        const post = postData.get({ plain: true });
        res.render('post', {
            post
        })
        } else {
            res.status(404).end()
        }
    } catch (err) { 
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk.(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post}],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login')
});

module.exports = router;