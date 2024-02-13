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

//check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
})

//Schema
const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            unique: true,
        }
    },
    {
        name: {
            type: String,
            required: [true, 'Required field'],
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        }
    },
    {
        password: {
            type: String,
        }
    },
    {
        gender: {
            type: String,
        }
    },
    {
        dateOfBirth: {
            type: Date,
        }
    },
    {
        email: {
            type: String,
        }
    },
    {
        mobileNumber: {
            type: String,
        }
    },
    {
        timeStamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

//Model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
