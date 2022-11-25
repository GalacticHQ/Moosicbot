const { MessageEmbed } = require("discord.js")
const requester = require("../../Models/Requester")
const mode247 = require("../../Models/247")
const announce =  require("../../Models/musicAnnouncement")
const { tick } = require("../../emojis")
module.exports = {
    name : "resetsettings",
    run : async (client,message,args)=> {
       const requesters = await requester.findOne({
        Guild: message.guild.id
       })
       const twentyFourSeven = await mode247.findOne({
        Guild: message.guild.id
       })
       const announces = await announce.findOne({
        Guild: message.guild.id
       })
       requester.remove();
       twentyFourSeven.remove();
       announces.remove();
       return message.reply({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`${tick} | Successfully Cleared All **Settings** for this Guild`)
        ]
       })
    }
}