const { MessageEmbed } = require("discord.js")
const guildSchema = require("../../Models/musicAnnouncement")
module.exports = {
    name : "announce",
    run : async (client,message,args)=> {
       let schema = await guildSchema.findOne({
        Guild: message.guild.id
       })
       if(!schema){
        new guildSchema({
            Guild: message.guild.id
        }).save()
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Enabled **Track** Announcement for this Guild`)
            ]
        })
       } else if(schema){
        schema.remove()
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Disabled Announcement of **Tracks** `)
            ]
        })
       }
    }
}