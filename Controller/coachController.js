const { CoachCounter, Coach } = require('../Model/coachModel');
const db = require('../Model/db');
const bcrypt = require('bcryptjs');

exports.coachRegisteration = async (req, res, next) => {
    try {
        const coach = await Coach.findOne({ name: req.body.name });

        if (!coach) {
            const counter = await CoachCounter.findByIdAndUpdate(
                { _id: 'coachId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true },
            );
            const coachId = 'CI-' + String(counter.seq).padStart(4, '0');

            const genSalt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.password, genSalt);

            req.body.coachId = coachId;
            req.body.password = hashPassword;
            await Coach.create(req.body);
            
            res.status(201).json({
                message: `Registered successfully with Coach ID: ${coachId}`,
            });
        } else {
            next({ status: 400, message: 'Coach already exists with this name'});
        }
    } catch (error) {
        next(error);
    }
};

exports.coachLogin = async (req, res, next) => {
    try {
        const coach = await Coach.findOne({ coachId: req.body.coachId });
        const isPasswordValid = await bcrypt.compare(req.body.password, coach.password);
        
        if (coach && isPasswordValid) {
            res.status(200).send('Login Sucessful'); 
        } else {
            next({ status: 400, message: 'Incorrect coach id or password'});
        }
    } catch (error) {
        next(error);
    }
};

exports.getAllCoaches = async (req, res, next) => {
    try {
        const allCoaches = await Coach.find({}, { _id: 0, __v: 0});

        if (allCoaches.length > 0) {
            res.status(200).json({
                allCoaches,
            });
        } else {
            next({ status: 400, message: 'No coach available at the moment'});
        }
    } catch (error) {
        next(error);
    }
};

exports.getCoachDetails = async (req, res, next) => {
    try {
        const coach = await Coach.findOne({ coachId: req.params.coachId });

        if (coach) {
            res.status(201).json({
                coach,
            })
        } else {
            next({ status: 400, message: 'Coach Id does not exist'});
        }
    } catch (error) {
        next(error);
    }
};