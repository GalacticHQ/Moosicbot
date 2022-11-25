const { MessageEmbed } = require("discord.js")
const ms = require("ms")
module.exports = {
    name : "uptime",
    run : async (client,message,args)=> {

    message.channel.send({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor({
                name: `${client.user.username}'s **Uptime**`,
                iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
            })
            .setDescription(`**Uptime :** ${ms(client.uptime)}\n **Last Restart :** <t:${Math.floor(Date.now() / 1000 - client.uptime) / 1000}:R>`)
        ]
    })
    }
}