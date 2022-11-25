const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');
const schema =  require("../../Models/customPlaylist")
const generator = require("voucher-code-generator")
module.exports = {
  name: "playlist-create",
  description: "Create's a custom playlist",
  inVc: true,
  sameVc: true,
  options: [{
    name: 'name',
    type: ApplicationCommandOptionType.String,
    description: 'Name of the playlist',
    required: true,
  }],
  category: "Playlist",
  run: async (client, interaction, args) => {// this will give time to reply
    const name = interaction.options.getString("name")
    const token = generator.generate("###-####").toString()
    const data = await schema.findOne({
        User: interaction.user.id,
        Name: name
    })
    if(data){
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`You already have a playlist created with the name: \`${name}\``)
            ]
        })
    } else {
        new schema({
            User: interaction.user.id,
            Name: name,
            Id: token
        }).save().then(() => {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(client.config.color)
                    .setDescription(`Succesfully created a new playlist.`)
                ]
            })
        })
    }

  }}