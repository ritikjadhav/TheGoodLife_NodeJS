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

exports.module = db; 