const mongoose = require('mongoose')


const EventSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: [true, 'Please provide event name'],
        trim: true,
        },
    description: {
        type: String,
        required: [true, 'Please provide event description'],
        trim: true,
    },
    website: {
        type: String,
        default: "none",
        trim: true,
    },
    socialMediaAcc: {
        type: String,
        default: "none",
        trim: true,
    },
    charges: {
        type: String,
        required: [true, 'Please provide charges for the registration'],
        trim: true
    },
    contactPersonName: {
        type: String,
        required: [true, 'Please provide contact person name'],
        trim: true,
    },
    emailContact: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        trim: true,
    },
    contactNumber: {
        type: String,
        required: [true, 'Please provide contact number'],
        trim: true,
    },
    typeOfEvent: {
        type: String,
        default: 'other',
        trim: true,
    },
    eventStartDate: {
        type: String,
        required: [true, 'Please provide start date for the event'],
        trim: true,
    },
    eventEndDate: {
        type: String,
        default: "none",
        trim: true,
    },
    lastDateToRegister: {
        type: String,
        required: [true, 'Please provide last date to register'],
        trim: true,
    },
    otherInfo: {
        type: String,
        default: "none",
        trim: true,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizer",
        required: true,
    }
},
    { timestamps: true }
);


module.exports = mongoose.model('Event', EventSchema)
