const postData = require('./postData');
const userData = require('./userData');
const commentData = require('./commentData');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n- Database Seeded -\n');

    await userData();
    console.log('\n- User Data Seeded -\n');

    await postData();
    console.log('\n- Post Data Seeded -\n');

    await commentData();
    console.log('\n- Comment Data Seeded -\n');

    process.exit(0);
};

seedDatabase();