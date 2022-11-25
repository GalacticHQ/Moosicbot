const { MessageEmbed } = require("discord.js")
const guildSchema = require("../../Models/Requester")
module.exports = {
    name : "requester",
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
                .setDescription(`Enabled **Requester** for this Guild`)
            ]
        })
       } else if(schema){
        schema.remove()
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`**Requester** wouldn't be shown on the tracks.`)
            ]
        })
       }
    }
}