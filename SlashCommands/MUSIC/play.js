const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "play",
  description: "Plays a song with given name or url",
  inVc: true,
  sameVc: true,
  options: [
    {
      name: 'song',
      type: ApplicationCommandOptionType.String,
      description: 'The track which you want to play',
      required: true,
      autocomplete: true
    },
  ],
  category: "Music",
  run: async (client, interaction, args) => {
    await interaction.deferReply()

    const memberChannel = interaction.member.voice.channelId

    // Spawning lavalink player
    const player = await client.poru.createConnection({
      guild: interaction.guildId,
      voiceChannel: interaction.member.voice.channelId,
      textChannel: interaction.channel,
      selfDeaf: true,
      selfMute: false,
    })

    // Getting tracks
    const resolve = await client.poru.resolve(interaction.options.getString('song', true))
    const { loadType, tracks, playlistInfo } = resolve;
    console.log(resolve.info)
    
    if (loadType === "PLAYLIST_LOADED") {

      for (x of resolve.tracks) {
         x.info.requester = interaction.member;
          player.queue.add(x);

      }
      interaction.editReply({ content: `Added: \`${resolve.tracks.length} from ${resolve.playlistInfo.name}\`` });
      if (!player.isPlaying && !player.isPaused) return player.play();

    }else if(loadType ==="SEARCH_RESULT"|| loadType ==="TRACK_LOADED"){
      const track = tracks.shift();
    track.info.requester = interaction.member;

     player.queue.add(track);
     const embed = new MessageEmbed()
     .setColor(client.config.color)
     .setTitle(`Added To Queue`)
     .setDescription(`[${track.info.title}](${track.info.uri})`)
        interaction.editReply({
          embeds: [embed]
        })
        if (!player.isPlaying && !player.isPaused) return player.play();
        
    }else{
      const embed2 = new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`No results were found.`)
       return interaction.editReply({ embeds: [embed2] })
    }

  }}