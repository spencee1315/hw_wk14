const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 4,
        comment_text: "This is a comment example!"
    },
    {
        user_id: 2,
        post_id: 3,
        comment_text: "This is another comment example!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "This is an additional comment example!"
    },
    {
        user_id: 4,
        post_id: 3,
        comment_text: "This is yet another comment example!"
    }
]

const commentData = () => Comment.bulkCreate(commentData);

module.exports = commentData;