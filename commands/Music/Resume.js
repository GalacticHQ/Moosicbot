const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "resume",
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, message, args) => {

    let player = client.poru.players.get(message.guild.id)

    if(!player.playing){
      player.resume(true)
      return message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`Resumed the Player`)
        ]
      })
    } else {
      return  message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`The Player Isn't Paused`)
        ]
      })
    }
  }
}