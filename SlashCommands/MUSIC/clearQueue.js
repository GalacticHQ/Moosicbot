const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "clear",
  description: "Clear's the queue!",
  inVc: true,
  sameVc: true,
  category: "Music",
  
  run: async (client, interaction, args) => {
 
    const memberChannel = interaction.member.voice.channel.id

    const player = client.poru.players.get(interaction.guild.id)

    if(!player.queue.length){
      interaction.reply({ embeds: [{
      color: `${client.config.color}`,
      description: `Nothing's Playing Right now`
    }]})
    }
    
    let queueLength = player.queue.length

    player.queue.clear();

    interaction.reply({ embeds: [{
      color: `${client.config.color}`,
      description: `Cleared \`${queueLength}\` from queue`
    }]})
  }
} // try it 