const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const schema = require("../Models/Requester")
const Announcement = require("../Models/musicAnnouncement")
module.exports.run = async (client,player,track) => {
 
    const ann = await Announcement.findOne({
        Guild: player.guild
    })
let menu = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setPlaceholder(`Nothing selected`)
    .setCustomId("filters")
    .addOptions([
        {
            label: `Reset`,
            description: `Clear's all the filters`,
            emoji: "<:Musica:1013332386219565087>",
            value: `reset`
        },
        {
            label: `8D`,
            description: `Toggle's 8D filter.`,
            emoji: "<:Musica:1013332386219565087>",
            value: '8d'
        },
        {
            label: `Nightcore`,
            description: `Toggle's nightcore filter`,
            value: 'nightcore',
            emoji: "<:Musica:1013332386219565087>"
        },
        {
            label: `Vaporwave`,
            description: `Toggle's vaporwave filter`,
            value: 'vaporwave',
            emoji: "<:Musica:1013332386219565087>"
        },
        {
            label: `Bassboost`,
            description: `Toggle's bassboost filter`,
            value: 'bassboost',
            emoji: "<:Musica:1013332386219565087>"
        },
        {
            label: `Tremolo`,
            description: `Toggle's tremolo filter`,
            value: 'tremolo',
            emoji: "<:Musica:1013332386219565087>"
        },
        {
            label: `Equalizer`,
            description: `Toggle's equalizer filter`,
            value: 'equalizer',
            emoji: "<:Musica:1013332386219565087>"
        },
        {
            label: `Vibration`,
            description: `Toggle's vibration filter`,
            value: 'vibration',
            emoji: "<:Musica:1013332386219565087>"
        },
        {
            label: `Timescale`,
            description: `Toggle's timescale filter`,
            value: 'timescale',
            emoji: "<:Musica:1013332386219565087>"
        },
        {
            label: `Karaoke`,
            description: `Toggle's karaoke filter`,
            value: 'karaoke',
            emoji: "<:Musica:1013332386219565087>"
        }
    ])
)
    let buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Skip`)
        .setCustomId("skipsong")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setLabel(`Pause & Resume`)
        .setCustomId("pauseresume")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("Loop")
        .setLabel("Loop")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("Shuffle")
        .setLabel(`Shuffle`)
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("stopsong")
        .setLabel(`Stop`)
        .setStyle("DANGER")
    )
    let req = [];
    const requestertoggled = await schema.findOne({
        Guild: player.guild
    })
    const string = "";
    string.slice("0", "1").split("")
    if(requestertoggled){
          req.push(`[${track.info.requester || client.user}]`)
    } else req.push("")
    if(ann){
        player.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setTitle(`Now Playing`)
                .setDescription(`[${track.info.title}](${track.info.uri}) ${req.join("\n")}`)
            ],
            components: [buttons]
        }).then(x => player.message = x)
     

    }else return;
   
   
}
