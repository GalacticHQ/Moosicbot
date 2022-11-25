const { MessageEmbed } = require("discord.js");
const { tick } = require("../../emojis");

module.exports = {
  name: "play",
  inVc: true,
  sameVc:true,
  args: true,
  aliases: ["p", "playcrow"],
  description: `Play's A Song <prefix>play <songname>`,
  run: async (client, message, args) => {

    const memberChannel = message.member.voice.channel.id

    // Spawning lavalink player
    const player = await client.poru.createConnection({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel,
      selfDeaf: true,
      selfMute: false,
    })

    // Getting tracks
    const resolve = await client.poru.resolve(args.join(' '))
    const { loadType, tracks, playlistInfo } = resolve;

    // Adding in queue
    if (loadType === "PLAYLIST_LOADED") {

      for (x of resolve.tracks) {
         x.info.requester = message.author;
          player.queue.add(x);

      }
      message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor(client.config.color)
        .setTitle(`Playlist Loaded`)
        .setDescription(` Added **${resolve.tracks.length}** tracks from **${resolve.playlistInfo.name}**`)
      ] });
      if (!player.isPlaying && !player.isPaused) return player.play();

    }else if(loadType ==="SEARCH_RESULT"|| loadType ==="TRACK_LOADED"){
      const track = tracks.shift();
    track.info.requester = message.author;

     player.queue.add(track);
        message.channel.send({
          embeds: [
            new MessageEmbed()
            .setColor(client.config.color)
            .setTitle(`Track Added`)
            .setDescription(`[${track.info.title}](${track.info.uri})`)
          ]
        })
        if (!player.isPlaying && !player.isPaused) return player.play();
        
    }else{
      
       return message.channel.send({ content: "There are no results found."})
    }


  
  }
}
