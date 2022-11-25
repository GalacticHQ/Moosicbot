const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "bassboost",
  description:"Toggles the bassboost filter.",
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
  if(!player.filters.equalizer){
    player.filters.setEqualizer(1, 0.9)
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`Bassboost is now **enabled.**`)
    ]
  })
  } else {
  player.filters.setEqualizer(0)
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`Bassboost is now **disabled.**`)
    ]
  })
}

  }
} 