const {MessageEmbed }  = require("discord.js")

module.exports = {
    name: "vaporwave",
    inVc: true,
    run: async (client, message, args) => {
      let player = client.poru.players.get(message.guild.id) 

      player.filters.setVaporwave(!player.filters.vaporwave)
      message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`**${player.filters.vaporwave ? "Enabled" : "Disabled"}** Vaporwave`)
        ]
      })
    }

  }
  