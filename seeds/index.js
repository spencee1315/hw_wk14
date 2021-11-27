const seedPosts = require('./postData');
const seedUsers = require('./userData');
const seedComments = require('./commentData');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n- Database Seeded -\n');

    await seedUsers();
    console.log('\n- User Data Seeded -\n');

    await seedPosts();
    console.log('\n- Post Data Seeded -\n');

    await seedComments();
    console.log('\n- Comment Data Seeded -\n');

    process.exit(0);
};

seedDatabase();