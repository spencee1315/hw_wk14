const { User } = require('../models');

const userData = [
    {
        username: "wesley_cat",
        twitter: "wesleyc",
        github: "wesleyc",
        email: "wesley@cat.com",
        password: "!password1"
    },
    {
        username: "elliott_spencer",
        twitter: "elliotts",
        github: "spencee1315",
        email: "elliott.spencer1315@gmail.com",
        password: "!password2"
    },
    {
        username: "sara_alk",
        twitter: "saraa",
        github: "saraa",
        email: "sara@gmail.com",
        password: "!password3"
    },
    {
        username: "pat_bateman",
        twitter: "patb",
        github: "patb",
        email: "patb@gmail.com",
        password: "!password4"
    },
]

const userData = () => User.bulkCreate(userData);

module.exports = userData;
    