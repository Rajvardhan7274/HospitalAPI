const express = require('express');
const passport = require('passport');
const ReportController = require('../controllers/report');
const router = express.Router();

//route for getting all reports with a specific status with jwt auth
router.get('/:status', passport.authenticate('jwt', { session: false }), ReportController.GetReports);

module.exports = router;
