const { MessageEmbed } = require("discord.js")
const tschema = require("../../Models/247")
module.exports = {
  name: "join",
  inVc: true,
  run: async (client, message, args) => {

    const player = await client.poru.createConnection({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel,
      selfDeaf: true,
      selfMute: false,
    })

    message.reply("Joined")

    const data = await tschema.findOne({
      Guild: message.guild.id
    })
    if(!data){
      setTimeout(async() => {
        player.destroy();
        return message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setTitle(`Premium Required`)
            .setDescription(`I left the voice channel as this server isn't premium, to avoid this **[Consider Buying Premium](https://discord.gg/2sFU2epJJr)**`)
          ]
        })
      }, 60000)
    } else return;
  }
}
