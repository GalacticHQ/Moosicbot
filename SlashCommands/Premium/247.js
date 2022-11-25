const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const guildSchema = require("../../Models/247")
module.exports = {
  name: "247",
  description:"Toggles 24/7 mode in the server.",
  inVc: true,
  sameVc: true,
  category: "Premium",
  voteOnly: true,
  run: async (client, interaction, args) => {

  const player = client.poru.players.get(interaction.guild.id)
  if(!player){
    return interaction.reply({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Nothing playing in this server.`)
        ]
    })
  }
  let schema = await guildSchema.findOne({
    Guild: interaction.guild.id
   })
   if(!schema){
    new guildSchema({
        Guild:interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id
    }).save()
    return interaction.reply({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`24/7 mode is now **enabled.**`)
        ]
    })
   } else if(schema){
    schema.remove()
    return interaction.reply({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`24/7 mode is now **disabled.**`)
        ]
    })
   }
  }
} 