const { MessageEmbed } = require("discord.js")

module.exports = {

name : "help",
description : "To get information about all commands",
run : async (client,interaction,args) => {



const embed = new MessageEmbed()
.setColor(client.config.color)
.setAuthor({
    name: `${client.user.username} Commands`,
    iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
})
.setThumbnail(`${interaction.guild.iconURL({dynamic: true, size: 1024, format: "png"} || "")}`)
.setDescription(`To get started,  join a voice channel and type \`/play\` to play a song! To get information about a specific command type \`/help <command name>\`.`)
.addField(`__**Music [${client.slash.filter(cmd => cmd.category === "Music").size}]**__`, `${client.slash.filter(cmd => cmd.category === "Music").map((cmd) => {
    return [`\`${cmd.name}\``].join(",")
})}`)
.addField(`__**Premium [${client.slash.filter(cmd => cmd.category === "Premium").size}]**__`, `${client.slash.filter(cmd => cmd.category === "Premium").map((cmd) => {
    return [`\`${cmd.name}\``].join(",")
})}`)
.addField(`__**Settings [6]**__`, `\`announce\`, \`prefix\`, \`requester\`, \`247\`, \`autoplay\`, \`prefix\``)
.addField(`__**Playlists [${client.slash.filter(cmd => cmd.category === "Playlist").size}]**__`, `${client.slash.filter(cmd => cmd.category === "Playlist").map((cmd) => {
    return [`\`${cmd.name}\``].join(",")
})}`)

interaction.reply({ embeds: [embed]})
}



}