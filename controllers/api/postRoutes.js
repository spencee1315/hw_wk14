const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get, Post.findAll
router.get('/', (req, res) => {
  console.log('=====');
  Post.findAll({
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    order: [['created_at', 'DESC']],
    include: [
      // Comment model
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
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get, post.findOne
router.get('/:id', (req, res) => {
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
      // Comment model
      {
        model: User,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Error: post id not found!'});
        return;
      }
      res.json(dbPostData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// post create
router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post update
router.put('/:id', withAuth, (req, res) => {
  Post.update({
    title: req.body.title,
    post_content: req.body.post_content
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Error: post id not found!'});
        return;
      }
        res.json(dbPostData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err); 
      });
});

module.exports = router;
