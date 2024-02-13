const userModel = require('../Model/goodLifeSchema');

const { v4: uuidv4 } = require('uuid');

exports.userRegisteration = async (req, res) => {
    try {
        const userId = uuidv4();

        const userData = {
            ...req.body,
            userId: userId,
        }

        const newUser = new userModel(userData);

        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                user: newUser,
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.invalidPath = (req, res) => {
    res.status(404).json({
        message: 'invalid path',
    })
}