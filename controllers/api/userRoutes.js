const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all
// route: /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findall() method
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch (err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// get one
// route: /api/users/id
router.get('/:id', (req, res) => {
  // Access our User model and run .findone() method
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_content', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'Error: user id cannot be found!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch (err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post, create
// route: /api/users
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    github: req.body.github
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.github = dbUserData.github;
      req.session.logged_in = true;

      res.json(dbUserData);
    });
  });
});

// post, login, findone
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }) .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'Error: email address entered cannot be found!'});
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Error: incorrect password!' });
        return;
      }

      req.session.save(() => {
        // declaring session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.github = dbUserData.github;
        req.session.logged_in = true;

        res.json({ user: dbUserData, message: 'Welcome!' });
      });
  })
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// put, update one
// route /api/users/id
// withAuth to restrict access
router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'Error: user id cannot be found!'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete, destroy one
// withAuth to restrict access
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user can be found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
