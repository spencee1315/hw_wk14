const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    // Get all Posts and JOIN with user data
    console.log("PostData1")
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    console.log("PostData2")

    // Serialize data so the template can read it
    const Posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    console.log("render")
    res.render('homepage', { 
      Posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/Post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('Post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github']
        }
      },
      {
        model: User,
        attributes: ['username', 'github']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true}));
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
