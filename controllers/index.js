const router = require('express').Router();

const api_Routes = require('./api');
const home_Routes = require('./homeRoutes');
const dashboard_Routes = require('./dashboardRoutes.js')

router.use('/api', api_Routes);
router.use('/', home_Routes);
router.use('/dashboard', dashboard_Routes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
