const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    User: String,
    Songs: Array,
    Id: String,
    Name: String
    
})

module.exports = mongoose.model("customPlaylist", schema)