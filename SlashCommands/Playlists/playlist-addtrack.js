const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');
const schema =  require("../../Models/customPlaylist")
const generator = require("voucher-code-generator")
module.exports = {
  name: "playlist-addcurrent",
  description: "Add's current track to a custom playlist",
  inVc: true,
  sameVc: true,
  options: [{
    name: 'playlist-token',
    type: ApplicationCommandOptionType.String,
    description: 'Token of the playlist in which song should be added',
    required: true,
  }],
  category: "Playlist",
  run: async (client, interaction, args) => {// this will give time to reply
    const token = interaction.options.getString("playlist-token")
    const data = await schema.findOne({
        User: interaction.user.id,
        Id: token
    })
    
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
    if(player.currentTrack){
     data.Songs.push(`${player.currentTrack.info.uri}`)
     data.save().then(() => {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setTitle(`Track Saved`)
                .setDescription(`Added [${player.currentTrack.info.title}](${player.currentTrack.info.uri}) to ${data.Name}`)
            ]
        })
     })
    }
    if(!player.currentTrack){
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`Please play a track, in order to save it in playlist`)
            ]
        })
    }
  if(!data){
    interaction.reply({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`I can't find playlist with the token: \`${token}\` in your account.`)
        ]
    })
  }
  

  }}