const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "loop",
  args: false,
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {

    let player = client.poru.players.get(message.guild.id)

    if (player.loop === 0) {
      message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`Now looping the **current track.**`)
        ]
      })
    } else if (player.loop === 1) {
      player.QueueRepeat();
      message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`Now looping the **queue.**`)
        ]
      })
    } else if (player.loop === 2) {
      player.DisableRepeat();
      message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`Looping is now **disabled.**`)
        ]
      })
    }
  }
}