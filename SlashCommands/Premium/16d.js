const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "16d",
  description:"Toggles the 16d mode.",
  inVc: true,
  sameVc: true,
  category: "Settings",
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
  if(player.filters.rotation){
    player.filters.setRotation(0)
    return interaction.reply({
      embeds: [
        new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`16d is now **disabled.**`)
      ]
    })
  }
  
  player.filters.setRotation({
    rotationHz: 0.4
  })
  console.log(player.filters.rotation)
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`16d is now **enabled.**`)
    ]
  })

  }
} 