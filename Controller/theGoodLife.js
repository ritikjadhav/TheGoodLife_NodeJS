const { Counter, User } = require('../Model/goodLifeSchema');
const bcrypt = require('bcryptjs');

const { v4: uuidv4 } = require('uuid'); // Generating unique userId by using UUIDs (Universally Unique Identifiers)

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
            console.log(req.body);

            const newUser = await User.create(req.body);
            res.send('User registered successfully');
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(404).json({
                message: error.message,
            })
            console.log(error.name, 'ritik');
        }
        console.log(error.message);
    }
}

exports.invalidPath = (req, res, next) => {
    let error = new Error();
    error.status = 400;
    error.message = 'Invalid Route';
    next(error);
}