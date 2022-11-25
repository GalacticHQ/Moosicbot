const {MessageEmbed }  = require("discord.js")

module.exports = {
    name: "nightcore",
    inVc: true,
    run: async (client, message, args) => {
      const actions = ["enable", "disable"]

      
      const player = client.poru.players.get(message.guild.id)
      if(!actions.includes(args[0])){
        return message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Plz specify a mode \`enable\`, \`disable\``)
          ]
        })
      }
      if(args[0] === "enable"){
        player.filters.setNightcore(true)
        return message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Nightcore is now **enabled.**`)
          ]
        })
      } else 
      if(args[0] === "disable"){
        player.filters.setNightcore(false)
        return message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Nightcore is now **disabled.**`)
          ]
        })
      }
      
    }

  }

  
  