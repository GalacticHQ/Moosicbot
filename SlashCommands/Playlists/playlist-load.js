const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');
const schema =  require("../../Models/customPlaylist")
const generator = require("voucher-code-generator");
module.exports = {
  name: "playlist-load",
  description: "Load's a playlist.",
 vcReq: true,
sameCh: true,
  options: [{
    name: 'playlist-token',
    type: ApplicationCommandOptionType.String,
    description: 'Token of the playlist in which song should be loaded',
    required: true,
  }],
  category: "Playlist",
 run: async (client, interaction, args) => {// this will give time to reply
    const token = interaction.options.getString("playlist-token")
    const data = await schema.findOne({
        User: interaction.user.id,
        Id: token
    })
    
    const player = client.poru.players.get(interaction.guild.id)
    if(!player){
        interaction.reply({
          embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Nothing is playing in this server.`)
          ]
        })
    } 
    if(player){
      let count = 0;
       for (const tracks of data.Songs) {
        let s = await client.poru.resolve(tracks);
        if (s.type === 'PLAYLIST_LOADED') {
          await player.queue.add(s.tracks[0]);
          if (!player.current) player.play();
          ++count;
        } else if (s.type === 'TRACK_LOADED') {
          await player.queue.add(s.tracks[0]);
          if (!player.current) player.play();
          ++count;
        } else if (s.type === 'SEARCH_RESULT') {
          const track = tracks.shift();
          track.info.requester = interaction.member;
           player.queue.add(track);
          if (!player.isPlaying) player.play();
          ++count;
        }
      }
      const m = await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`Loading ${data.Songs.length} track(s) from your playlist **${data.Name}** to the queue.`),
        ],
      })
     
    }
    
  

  }}