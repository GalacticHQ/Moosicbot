const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "resume",
  description: "Resumes the player!",
  inVc: true,
  sameVc: true,
  category: "Music",
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);

    if (!player.isPaused) {
      interaction.reply({ embeds: [{
        color: 'WHITE',
        title: ` Player is Already Resumed`
      }]})
    }
    else {
      if (player.isPaused) {
      player.pause(false)
      return interaction.reply({ embeds: [{
        color: 'WHITE',
        title: `Resumed the player!`
      }]})
    }
    }
    
  }
} // try it 