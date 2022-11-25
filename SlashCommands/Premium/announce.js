const { MessageEmbed } = require('discord.js')
const client = require("../../index")
const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const guildSchema = require("../../Models/musicAnnouncement")
module.exports = {
  name: "announce",
  description:`Toggles wheter AudioCord will announce when a track starts`,
  inVc: true,
  sameVc: true,
  category: "Settings",
  
  run: async (client, interaction, args) => {

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
                .setDescription(`Announcing of tracks is now **enabled.**`)
            ]
        })
       } else if(schema){
        schema.remove()
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Announcing of tracks is now **disabled.**`)
            ]
        })
       }
  }
} 