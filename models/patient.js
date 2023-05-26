const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    //name of the patient
    name: {
        type: String,
        required: true
    },

    //phone number of the patient, it must be a 10 digit number
    phone: {
        type: Number,
        unique: true,
        required: true,
        min: 1000000000,
        max: 9999999999
    },

    //age of the patient
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },

    //sex of the patient
    sex: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true
    },

    //whether the patient is comorbid or not
    // comorbidity: {
    //     type: Boolean,
    //     required: true
    // }
});

const Patient = mongoose.model('Patient', PatientSchema); //modelling the schema
module.exports = Patient;

