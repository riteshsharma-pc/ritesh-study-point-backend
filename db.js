const mongoose = require('mongoose');
require('dotenv').config()
const mongoUri = process.env.MONGOURI;
mongoose.set('strictQuery', true)

const connectToMongo = async () => {
    await mongoose.connect(mongoUri);
    console.log("Database is connected");
}

module.exports = connectToMongo;