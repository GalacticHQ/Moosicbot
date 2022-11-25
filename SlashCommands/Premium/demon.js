const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "demon",
  description:"Toggles the demon filter.",
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
        .setDescription(`Demon mode is now **disabled.**`)
      ]
    })
  } else {
  
  player.filters.setTimescale({
    speed: 1.4,
    rate: 0.9,
    pitch: 0.3
  })
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`Demon mode is now **enabled.**`)
    ]
  })
}
  }
} 