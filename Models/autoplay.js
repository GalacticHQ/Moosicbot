const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    Guild: String
    
})

module.exports = mongoose.model("autoplay", schema)