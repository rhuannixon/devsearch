const mongoose = require('mongoose');
const { Point } = require("./geoJson");

const devSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    geolocation: {
        type: Point,
        index: "2dsphere"
    },
});

module.exports = mongoose.model('Dev', devSchema);