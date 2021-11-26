const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/Post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
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
      if (!dbPostData) {
        res.status(404).json({ message: 'Error: post id not found!'});
        return;
      }

      // serialize the data, then pass into the template
      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        logged_in: req.session.logged_in
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
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
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;