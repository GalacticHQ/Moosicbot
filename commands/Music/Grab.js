const { MessageEmbed } = require("discord.js")
const tschema = require("../../Models/247")
module.exports = {
  name: "grab",
  inVc: true,
  run: async (client, message, args) => {

  const player = client.poru.players.get(message.guild.id)
  if(!player){
    return message.reply(`There's no player connected`)
  }
  message.author.send({
    embeds: [
        new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor({
            name: `Song Saved`,
            iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
        })
        .setThumbnail(`${player.currentTrack.info.image}`)
        .setTitle(`[${player.currentTrack.info.title}](${player.currentTrack.info.uri})`)
        .addField(`Song Author`, `${player.currentTrack.info.author}`)
        .addField(`Play it Again:`, `\`/play ${player.currentTrack.info.uri}\``)
        .addField(`Saved in:`, `${message.channel}`)
        .setFooter(`Sent from server: ${message.guild.name}`)
    ]
  }).then(() => {
    message.channel.send({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`<:zztick:986621160957558804> Succesfully grabbed the current track in your **Direct Messages**`)
        ]
    })
  }).catch((err) => {
    return message.reply({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`<:cross:986622105179267122> Your **Direct Messages** are disabled, plz enable them in order to save the song.`)
        ]
    })
  })
  
  
    
  }
}
