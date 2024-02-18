const { Counter, User } = require('../Model/userModel');
const { CoachCounter, Coach } = require('../Model/coachModel');
const { BookingCounter, Booking } = require('../Model/bookingModel');

exports.makeAppointment = async (req, res, next) => {
    try {
        const { userId, coachId } = req.params;
        const user = await User.findOne({ userId });
        const coach = await Coach.findOne({ coachId });

        if (!user) {
            return next({ status: 400, message: 'User Id does not exist' });
        }

        if (!coach) {
            return next({ status: 400, message: 'Coach Id does not exist' });
        }

        const existingSlot = await Booking.findOne({ slot: req.body.slot, appointmentDate: req.body.appointmentDate });

        if (existingSlot) {
            const isSameAppointment = existingSlot.coachId === req.params.coachId || existingSlot.userId === req.params.userId;
            if (isSameAppointment) {
                return next({ status: 400, message: 'There is an appointment in this slot already' });
            }
        }

        const counter = await BookingCounter.findByIdAndUpdate(
            { _id: 'bookingId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const bookingId = 'BI-' + String(counter.seq).padStart(4, '0');

        const newBooking = {
            ...req.body,
            userId,
            coachId,
            bookingId,
        };

        await Booking.create(newBooking);
        res.status(200).send(`Your slot is booked from ${req.body.slot} on ${req.body.appointmentDate}`);
    } catch (error) {
        next(error);
    }
};

exports.rescheduleApp = async (req, res, next) => {
    try {
        const bookingId = await Booking.findOneAndUpdate({ bookingId: req.params.bookingId }, {
            slot: req.body.slot,
            appointmentDate: req.body.appointmentDate,
        });

        if (bookingId) {
            return res.status(200).send(`Your slot is updated from ${req.body.slot} on ${req.body.appointmentDate}`);
        }
        next({ status: 400, message: 'Booking Id does not exist' });
    } catch (error) {
        next(error);
    }
};

exports.cancelAppointment = async (req, res, next) => {
    try {
        const bookingId = req.params.bookingId;
        const checkBookingId = await Booking.findOne({ bookingId });

        if (checkBookingId) {
            const cancelledAppointment = await Booking.deleteOne({ bookingId });

            if (cancelledAppointment) {
                return res.status(200).send(`Your appointment with Booking Id: ${bookingId} is cancelled`);
            }
        }
        
        next({ status: 400, message: 'Could not delete this appointment' });
    } catch (error) {
        next(error);
    }
};

exports.getAllCoachesApp = async (req, res, next) => {
    try {
        const coachId = req.params.coachId;
        const coachAppointments = await Booking.find({ coachId });
        
        if (coachAppointments.length !== 0) {
            return res.status(200).send({
                coachAppointments,
            });
        }
        
        next({ status: 400, message: 'Could not find any bookings'});
    } catch (error) {
        next(error);
    }
};

exports.getAllUserAppointments = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const userAppointments = await Booking.find({ userId });

        if (userAppointments.length !== 0) {
            return res.status(200).send({
                userAppointments,
            });
        }
        next({ status: 400, message: 'Could not find any appointment details'});
    } catch (error) {
        next(error);
    }
};