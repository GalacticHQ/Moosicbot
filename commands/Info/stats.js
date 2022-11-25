const { MessageEmbed } = require("discord.js")
const ms = require("ms")
const os = require("os")
const { loadingsystem, server, text, voice, music } = require("../../emojis")
const cpuStat = require("cpu-stat")
module.exports = {
    name : "stats",
    run : async (client,message,args)=> {
        let mcount = 0;
        client.guilds.cache.forEach((guild) => {
          mcount += guild.memberCount;
        });
        const textChannels = client.channels.cache.filter((a) => a.type === "GUILD_TEXT").size
        const voiceChannels = client.channels.cache.filter((a) => a.type === "GUILD_VOICE").size
        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
    message.channel.send({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor({
                name: `${client.user.username} Stats`,
                iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
            })//**Uptime :** <t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>
            .setDescription(` ${loadingsystem} __**System Info**__ ${loadingsystem}\n **CPU Usage :** ${percent.toFixed(2)}%\n **Memory Usage :** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 /1024).toFixed(2)} MB\n\n __**Bot's Information**__\n ${server} **Total Guilds :** ${client.guilds.cache.size}\n **Total Users :** ${mcount}\n\n __**Channels**__\n ${text} **Text :** ${textChannels}/${client.channels.cache.size}\n ${voice} **Voice :** ${voiceChannels}/${client.channels.cache.size}\n\n __**Music Info**__\n ${music} **Total Players :** ${client.poru.players.size}`)
        ]
    })
})
    }
}