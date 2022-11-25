const { MessageEmbed } = require("discord.js")
const guildSchema = require("../../Models/247")
module.exports = {
    name : "247",
    inVc: true,
    run : async (client,message,args)=> {
       let schema = await guildSchema.findOne({
        Guild: message.guild.id
       })
       if(!schema){
        new guildSchema({
            Guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id
        }).save()
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`24/7 mode is now **enabled.**`)
            ]
        })
       } else if(schema){
        schema.remove()
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`24/7 mode is now **disabled.**`)
            ]
        })
       }
    }
}