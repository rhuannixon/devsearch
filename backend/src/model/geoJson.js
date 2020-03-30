const Mongoose = require("mongoose");

const Point = new Mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = { Point };