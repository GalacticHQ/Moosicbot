const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ms = require("ms");
const { pagination } = require("../../functions")
module.exports = {
  name: "queue",
  aliases: "q",
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, message, args) => {
    const player = client.poru.players.get(message.guild.id)

    let tracks = player.queue.map((tr) => tr);
    let quelist = [];
    var maxmembers = 10;

    for (let i = 0; i < tracks.length; i += maxmembers) {
        quelist.push(
         tracks
          .slice(i, i + maxmembers)
          .sort((a, b) => b - a)
          .map((member, index) => {
            return `\`[0${index + 1}]\` ${member.info.title}`
          }).join("\n")
        )
        }

        let embeds = []
        for(let i = 0; i < quelist.length; i++){
          let desc = String(quelist[i]).substr(0, 2048)
          
          await embeds.push(
            new MessageEmbed()
            .setColor(client.config.color)
          .setTitle(`Total Songs: [${player.queue.length}]`)
            .setDescription(`${desc || "No emojis found."}`)
            .setFooter({
              text: `${client.user.username} • Page ${i}/${quelist.length}`,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
          )
        }
        pagination(message, embeds)
 }
}