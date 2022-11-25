const { MessageEmbed } = require("discord.js")
const guildSchema = require("../../Models/autoplay")
module.exports = {
    name : "autoplay",
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
                .setDescription(`Enabled **Autoplay** for this Guild`)
            ]
        })
       } else if(schema){
        schema.remove()
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Disabled **Autoplay**  for this Guild`)
            ]
        })
       }
    }
}