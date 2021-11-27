const { Post } = require('../models');

const postData = [
    {
        title: "Blog Post #1.",
        content: "This is a sample blog post.",
        user_id: 1
    },
    {
        title: "Blog Post #2.",
        content: "This is another sample blog post.",
        user_id: 2
    },
    {
        title: "Blog Post #3.",
        content: "This is an additional sample blog post.",
        user_id: 3
    },
    {
        title: "Blog Post #4.",
        content: "This is yet another sample blog post.",
        user_id: 4
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;