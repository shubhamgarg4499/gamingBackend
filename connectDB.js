
const mongoose = require('mongoose');
require("dotenv").config()
//Set up default mongoose connection
const url = process.env.mongodb_url;

async function connectDB() {
    const db = await mongoose.connect(url);
    // const collections = await db.connection.db.listCollections().toArray()

    console.log(db.connection.host);
    return db
}

module.exports = connectDB
