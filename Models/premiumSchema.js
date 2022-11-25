const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    User: String,
    activatedAt: Number,
    expires: Number,
    activatedGuilds: Array,
    totalBoosts: Number,
    usedBoosts: Number
    
})

module.exports = mongoose.model("premiumDB", schema)