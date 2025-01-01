const mongoose = require("mongoose");
const Schema = require("mongoose").Schema

const gameSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true
    },
    Developer: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    SubType: {
        type: String
    },
    GameURL: {
        type: String
    },
    GDURL: {
        type: String
    },
    Genres: {
        type: [String],
        default: []
    },
    Tags: {
        type: [String],
        default: []
    },
    Assets: {
        type: [String],
        default: []
    },
    Instructions: {
        type: String
    },
    KeyFeatures: {
        type: String
    },
    MobileReady: {
        type: [String],
        default: []
    },
    IsExclusive: {
        type: String
    },
    Gender: {
        type: [String],
        default: []
    },
    AgeGroup: {
        type: [String],
        default: []
    },
    NoBlood: {
        type: String
    },
    NoCruelty: {
        type: String
    },
    KidsFriendly: {
        type: String
    },
    Width: {
        type: Number
    },
    Height: {
        type: Number
    }
}, { timestamps: true });

const games = mongoose.model("games", gameSchema)



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    message: {
        type: String
    }
}, { timestamps: true })

const user = mongoose.model("user", userSchema)
module.exports = { games, user }