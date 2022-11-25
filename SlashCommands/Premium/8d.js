const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "8d",
  description:"Toggles the 8d mode.",
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
  if(player.filters._8d){
    player.filters.set8D(false)
    return interaction.reply({
      embeds: [
        new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`8d is now **disabled.**`)
      ]
    })
  }
  
  player.filters.set8D(true)
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`8d is now **enabled.**`)
    ]
  })

  }
} 