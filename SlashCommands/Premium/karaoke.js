const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "karaoke",
  description:"Toggles the Karaoke filter.",
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
  if(player.filters.karaoke){
    player.filters.setKaraoke(false)
    return interaction.reply({
      embeds: [
        new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`Karaoke is now **disabled.**`)
      ]
    })
  }
  
  player.filters.setKaraoke(true)
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`Karaoke is now **enabled.**`)
    ]
  })

  }
} 