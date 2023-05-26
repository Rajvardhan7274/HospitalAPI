const express = require('express');
const passport = require('passport');
const PatientController = require('../controllers/patient');
const router = express.Router();

//route for registering a new aptient with jwt auth
router.post('/register', passport.authenticate('jwt', { session: false }), PatientController.CreatePatient);
//route for creating a new report with jwt auth
router.post('/:id/create_report', passport.authenticate('jwt', { session: false }), PatientController.CreateReport);
//route for fetching all reports of a patient with jwt auth
router.get('/:id/all_reports', passport.authenticate('jwt', { session: false }), PatientController.AllReports);

module.exports = router;
