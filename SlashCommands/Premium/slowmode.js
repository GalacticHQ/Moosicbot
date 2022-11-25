const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "slowmode",
  description:"Toggles the slowmode.",
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
  if(player.filters.timescale){
    player.filters.setTimescale(0)
    return interaction.reply({
      embeds: [
        new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`Slowmode is now **disabled.**`)
      ]
    })
  }
  
  player.filters.setTimescale({
    speed: 0.5,
              pitch: 1.0,
              rate: 0.8,
  })
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`Slowmode is now **enabled.**`)
    ]
  })

  }
} 