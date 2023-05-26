const jwt = require("jsonwebtoken"); //used to decode jwt token
const Report = require('../models/report'); //Report model
const Doctor = require('../models/doctor'); //Doctor model

//fetching all reports with specific status
module.exports.GetReports = async function (req, res) {
    //extracting doctor's info from jwt token sent to servers
    const doctorJWTToken = req.headers.authorization;
    const token = doctorJWTToken.split(' ');
    const decoded = jwt.verify(token[1], 'PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp');

    try {
        const doctor = await Doctor.findById(decoded._id); //finding the doctor
        if (!doctor) {
            //if doctor dosen't exist
            return res.json(401, {
                message: 'Doctor does not exist in database!'
            })
        } else {
            let reports = await Report.find({ status: req.params.status }); //fetching the reports
            return res.json(200, {
                message: 'Reports fetched successfully',
                data: reports
            })
        }

    } catch {
        //checking for errors
        console.log('Internal server error!!');
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}