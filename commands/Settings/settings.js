const { MessageEmbed } = require("discord.js")
const twentyfoursevenschema = require("../../Models/247")
const reqschema = require("../../Models/Requester")
const announcementschema = require("../../Models/musicAnnouncement")
const autoplayschema = require("../../Models/autoplay")
const { enabled, disabled } = require("../../emojis")
module.exports = {
    name : "settings",
    run : async (client,message,args) => {
        let twentyfourstatus = [];
        let reqstatus = [];
      const twenty_fourseven = await twentyfoursevenschema.findOne({
        Guild: message.guild.id
      })
      if(twenty_fourseven){
        twentyfourstatus.push(`${enabled}`)
      } else {
        twentyfourstatus.push(`${disabled}`)
      }
    const req = await reqschema.findOne({
        Guild: message.guild.id
    })
    if(req){
        reqstatus.push(`${enabled}`)
    } else {
        reqstatus.push(`${disabled}`)
    }
    let announcestaus = [];
    const ann = await announcementschema.findOne({
        Guild: message.guild.id
    })
    if(ann){
        announcestaus.push(`${enabled}`)
    } else {
        announcestaus.push(`${disabled}`)
    }
    const autoplay = [];
    const ap = await autoplayschema.findOne({
        Guild: message.guild.id
    })
    
    if(ap){
        autoplay.push(`${enabled}`)
    } else {
        autoplay.push(`${disabled}`)
    }
    message.reply({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor({
                name: `${client.user.username} Settings`,
                iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
            })
            .setDescription(`To Disable A Specific Setting You Can Use Help Command and get the avaliable commands to disable these settings use \`+settings reset\`\n\n **24/7 :** ${twentyfourstatus.join("\n")}\n **Requester :** ${reqstatus.join("\n")}\n  **Track Announcement :** ${announcestaus.join("\n")}\n **Autoplay :** ${autoplay.join("\n")}`)
        ]
    })
    }
}