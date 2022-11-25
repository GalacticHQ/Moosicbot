const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "disconnect",
  description: "disconnect the bot!",
  inVc: true,
  sameVc: true,
  player:true,
  category: "Music",
  run: async (client, interaction, args) => {
  const player = client.poru.players.get(interaction.guild.id);
  player.destroy();
  return interaction.reply({ embeds: [{ color: `${client.config.color}`, description: 'Successfully Disconnected!'}]})  
  }
}
