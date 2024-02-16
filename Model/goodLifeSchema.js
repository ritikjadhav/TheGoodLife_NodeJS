/* Creating a Mongoose model comprises primarily three parts:
    1. Referencing Mongoose
        Intsalling Mongoose - npm install --save mongoose
    2. Defining the Schema
    3. Creating a Model
*/

const mongoose = require('mongoose');
//MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017/lifecoaches';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validator = require('../Utilities/validator');

//check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
})

//Schema
const counterSchema = new mongoose.Schema({
    _id: String,
    seq: Number,
});

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            minLength: [3, 'Name must be at least 3 characters long'],
            maxLength: [50, 'Name cannot exceed 50 characters'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [6, 'Password should have minimum 6 characters'],
        },
        gender: {
            type: String,
            enum: {
                values: ['M', 'F', 'Other'],
                message: 'Gender should be either  M or F or Other',
            }
        },
        dateOfBirth: {
            type: Date,
            required: [true, 'Date of Birth is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate: {
                validator: validator.validateEmail,
                message: 'Enter a valid email id'
            }
        },
        mobileNumber: {
            type: String,
            required: [true, 'Mobile Number is required'],
            validate: {
                validator: validator.validateMobileNo,
                message: 'Mobile Number should have 10 digits'
            }
        }
    },
    {
        timeStamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
);

//Model
const Counter = mongoose.model('Counter', counterSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Counter: Counter,
    User: User
};
