const { MessageEmbed } = require("discord.js");
const twentyfourSeven = require("../Models/247")
module.exports.run = async (client,oldVoice,newVoice) => {

 const player = client.poru.players.get(oldVoice.guild.id);
      if (!player) return;

      const autoConnect = await twentyfourSeven.findOne({
        Guild: newVoice.guild.id
      })
      if(newVoice === null){
        await client.poru.createConnection({
          guild: newVoice.guild.id,
          voiceChannel: autoConnect.voiceChannel,
          textChannel: message.channel,
          selfDeaf: true,
          selfMute: false,
        })
        let channel = client.channels.cache.get(autoConnect.textChannel)
        channel.send({
          embeds: [
            new MessageEmbed()
            .setTitle(`Re-connected.`)
            .setColor(client.config.color)
            .setDescription(`**Reconnected** to <#${autoConnect.voiceChannel}> as 247 mode was enabled`)
          ]
        })
      }
}
