const { MessageEmbed } = require("discord.js")

module.exports = {

name : "ping",
description : "Show's bot Latency.",
run : async (client,interaction,args) => {



const embed = new MessageEmbed()
.setColor(client.config.color)
.setDescription(`${client.ws.ping}ms`)

interaction.reply({ embeds: [embed]})
}



}