const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    Guild: String,
    Prefix: String,
    MusicLogs: String,
    isPremium: Boolean,
    premiumActivatedBy: String,
    expiresAt: Number,
    activatedAt: Number,
    currentBoosts: Number,
})

module.exports = mongoose.model("GuildDB", schema)