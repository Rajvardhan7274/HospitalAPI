const jwt = require('jsonwebtoken'); //used to decode jwt token
const Patient = require('../models/patient'); //Patient model
const Doctor = require('../models/doctor'); //Doctor model
const Report = require('../models/report'); //Report model

//creating a new patient
module.exports.CreatePatient = async function (req, res) {
    try {
        //extracting doctor's info from jwt token sent to server
        const doctorJWTToken = req.headers.authorization;
        const token = doctorJWTToken.split(' ');
        const decoded = jwt.verify(token[1], 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp');

        const doctor = await Doctor.findById(decoded._id); //finding the doctor

        if (!doctor) {
            //if doctor doesn't exist
            return res.status(401).json({
                message: 'Doctor does not exist in the database!'
            });
        }

        let patient = await Patient.findOne({ phone: req.body.phone }); //finding the patient
        if (patient) {
            //if patient already exists return his/her details
            return res.status(201).json({
                message: 'Patient already exists',
                data: patient
            });
        }

        patient = await Patient.create(req.body); //creating a new patient
        return res.status(200).json({
            message: 'Patient created successfully',
            data: patient
        });
    } catch (error) {
        //checking for errors
        console.log('Internal server error!!', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

//creating a new report
module.exports.CreateReport = async function (req, res) {
    try {
        //extracting doctor's info from jwt token sent to server
        const doctorJWTToken = req.headers.authorization;
        const token = doctorJWTToken.split(' ');
        const decoded = jwt.verify(token[1], 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp');

        const doctor = await Doctor.findById(decoded._id); //finding the doctor
        if (!doctor) {
            //if doctor doesn't exist
            return res.status(401).json({
                message: 'Doctor does not exist in the database!'
            });
        }

        let patient = await Patient.findById(req.params.id); //finding the patient
        if (!patient) {
            //if patient doesn't exist
            return res.status(401).json({
                message: 'Patient does not exist in the database!'
            });
        }

        //if patient exists create his/her report
        let report = await Report.create({
            doctor: decoded._id,
            patient: patient._id,
            status: req.body.status
        });

        return res.status(201).json({
            message: 'Report created successfully',
            data: report
        });
    } catch (error) {
        //checking for errors
        console.log('Internal server error!!', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

//fetching all reports of a patient
module.exports.AllReports = async function (req, res) {
    try {
        //extracting doctor's info from jwt token sent to server
        const doctorJWTToken = req.headers.authorization;
        const token = doctorJWTToken.split(' ');
        const decoded = jwt.verify(token[1], 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp');

        const doctor = await Doctor.findById(decoded._id); //finding the doctor
        if (!doctor) {
            //if doctor doesn't exist
            return res.status(401).json({
                message: 'Doctor does not exist in the database!'
            });
        }

        let patient = await Patient.findById(req.params.id); //finding the patient
        if (!patient) {
            //if patient doesn't exist
            return res.status(401).json({
                message: 'Patient does not exist in the database!'
            });
        }

        //if patient exists
        let reports = await Report.find({ patient: patient._id }).sort({ date: -1 }); //fetching all reports of a patient

        return res.status(200).json({
            message: 'Reports fetched successfully',
            data: reports
        });
    } catch (error) {
        //checking for errors
        console.log('Internal server error!!', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
