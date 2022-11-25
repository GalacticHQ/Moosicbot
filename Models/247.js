const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    Guild: String,
    voiceChannel: String,
    textChannel: String
    
})

module.exports = mongoose.model("247", schema)