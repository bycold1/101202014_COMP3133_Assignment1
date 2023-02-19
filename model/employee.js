const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 100,
        required: true,
    },
    last_name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type : String,
        required: true,
        index: {
            unique: true
        },
        maxlength: 50        
    },
    gender: {
        type: String,
        maxlength: 25,
        enum: ['Male', 'Female', 'Other'],
        required: "Please set MALE, FEMALE or OTHER"
    },
    salary: {
        type: Number,
        required: true,
    },

})

module.exports = model('Employee', employeeSchema);
