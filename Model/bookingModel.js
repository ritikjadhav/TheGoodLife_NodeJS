const mongoose = require('mongoose');
const validator = require('../Utilities/validator');

//Schema
const counterSchema = new mongoose.Schema({
    _id: String,
    seq: Number,
});

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            unique: true,
        },
        userId: {
            type: String,
        },
        coachId: {
            type: String,
        },
        appointmentDate: {
            type: Date,
            required: [true, 'Appointment Date is required'],
            validate: {
                validator: validator.validateAppDate,
                message: 'Date should be any upcoming 7 days',
            },
        },
        slot: {
            type: String,
            required: [true, 'Slot is required'],
            validate: {
                validator: validator.validateSlot,
                message: 'Slot should be a valid one',
            },
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

//Model
const BookingCounter = mongoose.model('BookingCounter', counterSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
    BookingCounter: BookingCounter,
    Booking: Booking,
};
