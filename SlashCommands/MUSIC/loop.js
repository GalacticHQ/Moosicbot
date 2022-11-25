const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "loop",
  description: "set current song to loop mode!",
  inVc: true,
  sameVc: true,
  category: "Music",
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);
  
    if (player.loop === 0) {
      player.TrackRepeat();
      interaction.reply( { embeds: [{
        color: `${client.config.color}`,
        description: `Looped the Current Track`
      }]})
    } else if (player.loop === 1) {
      player.QueueRepeat();
      interaction.reply( { embeds: [{
        color: `${client.config.color}`,
        description: `Looped the Whole Queue`
      }]})
    } else if (player.loop === 2) {
      player.DisableRepeat();
      interaction.reply( { embeds: [{
        color: `${client.config.color}`,
        description: `Disabled Loop Mode`
      }]})
    }
  }
} 
