const express = require('express');
const bookings = require('../Controller/userController');

const routing = express.Router();

routing.post('/users', bookings.userRegisteration);

routing.post('/users/login', bookings.userLogin);

// routing.post('/coaches', bookings.coachRegisteration);

// routing.post('/coaches/login', bookings.coachLogin);

// routing.get('coaches/all', bookings.getAllCoaches);

// routing.get('/coaches/:coachId', bookings.getCoachDetails);

routing.get('/users/:userId', bookings.getUserDetails);

// routing.post('/users/booking/:userId/:coachId', bookings.makeAppointment);

// routing.put('/booking/:bookingId', bookings.rescheduleApp);

// routing.delete('/booking/:bookingId', bookings.cancelApp);

// routing.get('/users/booking/:coachId', bookings.getAllCoachesApp);

// routing.get('/users/booking/:userId', bookings.getAllUsersApp);

routing.all('*', bookings.invalidPath);

module.exports = routing;