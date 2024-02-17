const { Counter, User } = require('../Model/userModel');
const db = require('../Model/db');
const bcrypt = require('bcryptjs');

// Another way for generating unique userId by using UUIDs (Universally Unique Identifiers)

exports.userRegisteration = async (req, res, next) => {
    try {
        const email = await User.findOne({ email: req.body.email });
        if (email) {
            const err = new Error();
            err.status = 400;
            err.message = 'User already exists with this email id';
            next(err);
        } else {
            // Find the counter document and increment the sequence
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'userId' },
                { $inc: { seq: 1 } }, // Increment the sequence field by one
                { new: true, upsert: true } // Returns the updated document
            );

            const userId = 'UI-' + String(counter.seq).padStart(4, '0');
            req.body.userId = userId;

            const genSalt = bcrypt.genSaltSync(10); // Generate the salt 
            const hashPassword = bcrypt.hashSync(req.body.password, genSalt); // Hash the password with the generated salt

            req.body.password = hashPassword;

            await User.create(req.body);
            
            res.status(201).json({
                message: `Registered successfully with User ID: ${userId}`,
            });
        }
    } catch (error) {
        const err = new Error(error.message);
        err.status = 400;
        next(err);
    }
};

exports.userLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.body.userId });

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (user && isPasswordValid) {
            res.status(200).send('Login Successful');
        } else {
            // If user not found, return this message
            const error = new Error();
            error.status = 400;
            error.message = 'Incorrect user id or password';
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findOne({ "userId": req.params.userId });

        if (user) {
            res.status(200).json({
                user,
            });
        } else {
            const error = new Error();
            error.status = 400;
            error.message = 'User Id does not exist';
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

exports.invalidPath = (req, res, next) => {
    let error = new Error();
    error.status = 400;
    error.message = 'Invalid Route';
    next(error);
};