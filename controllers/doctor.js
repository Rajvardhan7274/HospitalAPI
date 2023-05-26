const jwt = require('jsonwebtoken'); //used to decode jwt token
const Doctor = require('../models/doctor'); //Doctor model

//creates a new doctor account
module.exports.CreateDoctor = async function (req, res) {
    try {
        let doctor = await Doctor.findOne({ email: req.body.email }); //checking if doctor already exists
        if (doctor) {
            //if doctor exists
            return res.status(409).json({
                message: 'Doctor already exists!'
            });
        } else {
            doctor = await Doctor.create(req.body); //creating a new doctor account
            return res.status(201).json({
                message: 'Doctor created successfully!'
            });
        }
    } catch (error) {
        //catching errors
        console.log('Internal server error!!', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

//logging in a doctor
module.exports.DoctorLogin = async function (req, res) {
    try {
        //finding the doctor
        let doctor = await Doctor.findOne({ email: req.body.email });
        if (!doctor || doctor.password !== req.body.password) {
            //if doctor doesn't exist or invalid password
            return res.status(401).json({
                message: 'Invalid username/password'
            });
        }

        //if log in successful return a new jwt token that expires in 2 hours
        return res.status(200).json({
            message: 'Login successful, JWT token sent successfully, please keep it safe!',
            data: {
                //creating the new jwt token
                token: jwt.sign(doctor.toJSON(), 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp', { expiresIn: '7200000' })
            }
        });
    } catch (error) {
        //catching errors
        console.log('Internal Server Error!!', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};






