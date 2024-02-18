const express = require('express');
const user = require('../Controller/userController');
const coach = require('../Controller/coachController');
const booking = require('../Controller/bookingController');

const routing = express.Router();

routing.post('/users', user.userRegisteration);

routing.post('/users/login', user.userLogin);

routing.post('/coaches', coach.coachRegisteration);

routing.post('/coaches/login', coach.coachLogin);

routing.get('/coaches/all', coach.getAllCoaches);

routing.get('/coaches/:coachId', coach.getCoachDetails);

routing.get('/users/:userId', user.getUserDetails);

routing.post('/users/booking/:userId/:coachId', booking.makeAppointment);

routing.put('/booking/:bookingId', booking.rescheduleApp);

routing.delete('/booking/:bookingId', booking.cancelAppointment);

routing.get('/coaches/booking/:coachId', booking.getAllCoachesApp);

routing.get('/users/booking/:userId', booking.getAllUserAppointments);

routing.all('*', user.invalidPath);

module.exports = routing;