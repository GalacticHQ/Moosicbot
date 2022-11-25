const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');
const schema =  require("../../Models/customPlaylist")
const generator = require("voucher-code-generator")
module.exports = {
  name: "playlist-list",
  description: "List's your created playlists and it's token",
  inVc: true,
  category: "Playlist",
  run: async (client, interaction, args) => {
    const data = await schema.find({
        User: interaction.user.id
    })
    
    if(!data){
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setDescription(`You don't have any custom playlist created, use \`/playlist-create\` to create one.`)
            ]
        })
    }

    if(data){
        console.log(data)
        const map = data.map((value, a) => `\`${a + 1}]\` Name: ${value.Name}\n Token: ${value.Id}`);
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(client.config.color)
                .setAuthor({
                    name: `${map.length} Playlists`,
                    iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
                })
                .addField(`__**${interaction.user.username}'s Playlists**__`, `${map.join("\n\n")}`)
            ]
        })
    } 
    
  }}