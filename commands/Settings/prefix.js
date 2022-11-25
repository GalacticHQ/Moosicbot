const { MessageEmbed } = require("discord.js")
const guildSchema = require("../../Models/GuildDB")
module.exports = {
    name : "prefix",
    aliases: "setprefix",
    run : async (client,message,args)=> {
        const prefix = args.join("")
        let data = await guildSchema.findOne({
            Guild: message.guild.findOne
        })
        if(!data){
            new guildSchema({
                Guild: message.guild.findOne,
                Prefix: prefix
            }).save()
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(client.config.color)
                    .setDescription(`Updated this Guild's Prefix to \`${prefix}\``)
                ]
            })
        } else {
            guildSchema.findOneAndUpdate({Guild: message.guild.id}, {Prefix: prefix})
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(client.config.color)
                    .setDescription(`Updated this Guild's Prefix to \`${prefix}\``)
                ]
            })
        }
    }
}