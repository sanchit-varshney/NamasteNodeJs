const mongoose = require('mongoose');

const connectdb = async () => {
    mongoose.connect('mongodb+srv://devtinder:devtinder@nodejs.ytrlesr.mongodb.net/devTinder');
};

module.exports = connectdb;
