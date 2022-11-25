const {MessageEmbed }  = require("discord.js")

module.exports = {
    name: "8d",
    inVc: true,
    run: async (client, message, args) => {
  
      const player = client.poru.players.get(message.guild.id)
      if(player.filters._8d){
        player.filters.set8D(false)
        return message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`8d is now **disabled.**`)
          ]
        })
      }
      
      player.filters.set8D(true)
      return message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`8d is now **enabled.**`)
        ]
      })
      
    }

  }
  