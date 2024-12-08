const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://user1:K.balaji1@cluster0.ttxcaej.mongodb.net/Employee'); 
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
