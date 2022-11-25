const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {

name : "about",
description : "Shows the information about this bot.",
run : async (client,interaction,args) => {


const user = await client.users.fetch("788745942777462794")
const embed = new MessageEmbed()
.setColor(client.config.color)
.setAuthor({
    name: `About ${client.user.username}`,
    iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
})
.setThumbnail(`${interaction.guild.iconURL({dynamic: true, size: 1024, format: "png"} || "")}`)
.setDescription(`Hi, I'm **${client.user.username}**. My Work is to **play** Music. You can check every command by \`/help\`. I am developed in JavaScript`)
.addField(`Owner(s)`, `[${user.tag}](https://discord.com/users/788745942777462794), Special thanks to [${user.tag}](https://discord.com/users/788745942777462794), and all the supporters`)
let row = new MessageActionRow().addComponents(
    new MessageButton()
    .setLabel(`Support Server`)
    .setStyle("LINK")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    new MessageButton()
    .setLabel(`Invite Me`)
    .setStyle("LINK")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    new MessageButton()
    .setLabel("Vote")
    .setStyle("LINK")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    new MessageButton()
    .setLabel(`Premium`)
    .setStyle("LINK")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
)
interaction.reply({ embeds: [embed], components: [row]})
}



}