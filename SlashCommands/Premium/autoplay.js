const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const guildSchema = require("../../Models/musicAnnouncement")
module.exports = {
  name: "autoplay",
  description:"Toggles autoplay in this server!",
  inVc: true,
  sameVc: true,
  category: "Settings",
  run: async (client, interaction, args) => {
    let schema = await guildSchema.findOne({
        Guild: interaction.guild.id
       })
       if(!schema){
        new guildSchema({
            Guild: interaction.guild.id
        }).save()
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Autoplay mode is now **enabled** in this server.`)
            ]
        })
       } else if(schema){
        schema.remove()
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Autoplay mode is now **disabled** in this server.`)
            ]
        })
       }
  }
} 