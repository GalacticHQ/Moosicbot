const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');
const schema =  require("../../Models/customPlaylist")
const generator = require("voucher-code-generator")
module.exports = {
  name: "playlist-delete",
  description: "Delete's a playlist",
  inVc: true,
  sameVc: true,
  options: [{
    name: 'token',
    type: ApplicationCommandOptionType.String,
    description: 'Token of the playlist',
    required: true,
  }],
  category: "Playlist",
  run: async (client, interaction, args) => {// this will give time to reply
    const name = interaction.options.getString("token")
    const token = generator.generate("###-####").toString()
    const data = await schema.findOne({
        User: interaction.user.id,
        Id: name
    })
    if(data){
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Succesfully deleted the playlist: \`${data.Name}\``)
            ]
        })
        data.remove();
    } else {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`No such playlist found with the token: \`${name}\``)
            ]
        })
    }
  

  }}