const { MessageEmbed } = require("discord.js");
const schema = require("../Models/247")
const autoplayschema = require("../Models/autoplay")
module.exports.run = async (client,player,track) => {
    console.log(player.guild)
    const autoplay = await autoplayschema.findOne({
        Guild: player.guild
     })
     if(autoplay){
        player.autoplay(true);
        console.log(`autoplaying`)
     } else return

 const tschema = await schema.findOne({
    Guild: player.guild
 })

 if(!tschema){
    player.destroy()
    player.textChannel.send({
        embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`I've left voice channel as \`24/7\` Mode wasn't enabled, Consider [Buying Premium](https://discord.gg/nnMXnpewg5) or Voting me`)
            .setTitle(`Premium Required`)
        ]
    })
 } else return;

 
}