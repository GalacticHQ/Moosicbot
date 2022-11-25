const { MessageEmbed } = require("discord.js")
const guildSchema = require("../../Models/GuildDB")
module.exports = {
    name : "setlogs",
    aliases: "musiclogs",
    run : async (client,message,args)=> {
        const channel = message.mentions.channels.first()
        let data = await guildSchema.findOne({
            Guild: message.guild.findOne
        })
        if(!data){
            new guildSchema({
                Guild: message.guild.findOne,
                MusicLogs: channel.id
            }).save()
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(client.config.color)
                    .setDescription(`All Music Logs would be sent to ${channel}`)
                ]
            })
        } else {
            guildSchema.findOneAndUpdate({Guild: `${message.guild.id}`}, {MusicLogs: channel.id}, async(err) => {
                if(err){
                    console.log(`Error`)
                }
            })
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(client.config.color)
                    .setDescription(`All Music Logs would be sent to ${channel}`)
                ]
            })
        }
    }
}