const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const topggClient = require("..");
const {color} = require('../config.json')
module.exports.run = async (client, interaction) => {

  if(interaction.isButton()){
    if(interaction.customId === "tos"){
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setColor(color)
          .setDescription(`**These All Are the Privacy Policy Provided by Spotify, Someone found not following will be blacklisted permanently. [Developers Policy](https://developer.spotify.com/terms/) | [User Policy](https://www.spotify.com/us/legal/privacy-policy/)**`)
        ],
        ephemeral: true
      })
    } 
    if(interaction.customId === "skipsong"){
        let player = client.poru.players.get(interaction.guildId)
        if(!player.playing){
            return interaction.reply({
                content: `Nothing's Playing`,
                ephemeral: true
            })
        } else {
          player.stop(true);
          return interaction.reply({
            content: `Skipped the song`,
                ephemeral: true
          })
        }
    }
    if(interaction.customId === "Loop"){
      let player = client.poru.players.get(interaction.guildId)
      if(player.loop === 0){
      player.TrackRepeat();
      return interaction.reply({
        embeds: [
          new MessageEmbed()
          .setColor(color)
          .setDescription(`Looped the current track.`)
        ],
        ephemeral: true
      })
      } 
      if(player.loop === 1){
        player.QueueRepeat();
        return interaction.reply({
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setDescription(`Looped the whole queue.`)
          ],
          ephemeral: true
        })
      }
      if(player.loop === 2){
        player.DisableRepeat()
        return interaction.reply({
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setDescription(`Disabled loop mode.`)
          ],
          ephemeral: true
        })
      }
      
    }
    function skip(){
      let player = client.poru.players.get(interaction.guildId)
      if(interaction.user.voice.channel !== interaction.guild.me.voice.channel){
        return interaction.reply({
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setDescription(`We both must be in a same voice channel.`)
          ]
        })
      }
      if(!player || player.isPlaying){
        interaction.reply({
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setDescription(`There's nothing playing right now.`)
          ]
        })
      }
    }
    
    function pause(){
      let player = client.poru.players.get(interaction.guildId)
      let track = player.currentTrack;
      let buttons = new MessageActionRow()
      .addComponents(
          new MessageButton()
          .setLabel(`Skip`)
          .setCustomId("skipsong")
          .setStyle("SECONDARY"),
          new MessageButton()
          .setLabel(`Resume`)
          .setCustomId("pauseresume")
          .setStyle("SUCCESS"),
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
      player.pause(true)
      player.message.delete().then(() => {
        player.textChannel.send({
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`Now Playing`)
            .setDescription(`[${track.info.title}](${track.info.uri})`)
          ],
          components: [
            buttons
          ]
        }).then(x => player.message = x)
      })
     
    }
    function resume(){
      
      let buttons = new MessageActionRow()
      .addComponents(
          new MessageButton()
          .setLabel(`Skip`)
          .setCustomId("skipsong")
          .setStyle("SECONDARY"),
          new MessageButton()
          .setLabel("Pause")
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
      let player = client.poru.players.get(interaction.guild.id)
      let track = player.currentTrack;
      player.pause(false)
    
     player.message.delete().then(() => {
       player.textChannel.send({
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`Now Playing`)
            .setDescription(`[${track.info.title}](${track.info.uri})`)
          ],
          components: [
            buttons
          ]
        }).then(x => player.message = x)
      })
     
      
      
    }
    if(interaction.customId === "pauseresume"){
      
      let player = client.poru.players.get(interaction.guildId)
      if(!player.isPlaying){
      resume()
      } else if(player.isPlaying){
        pause()
      }
    }
    if(interaction.customId === "stopsong"){
      let player = client.poru.players.get(interaction.guildId)
      player.destroy();
      player.message.delete();
      return interaction.reply({
        content: "Successfully Stopped",
        ephemeral: true
      })
    }
    
}

    if (interaction.isCommand()) {
  
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ embeds: [
          new MessageEmbed()
          .setColor(client.config.color)
          .setDescription(`The **command** which you are trying to execute does not exists. To get a list of all commands use \`/help\``)
        ]});
if (!command) return

  const player = client.poru.players.get(interaction.guild.id);
  const memberChannel = interaction.member.voice.channelId;
  const botChannel = interaction.guild.me.voice.channelId;

  const hasVoted = await topggClient.hasVoted(interaction.user.id)
if(command.voteOnly && !hasVoted){
  return interaction.reply({
    embeds: [
      new MessageEmbed()
      .setColor(client.config.color)
      .setDescription(`You must [vote](https://top.gg/bot/927092113315868713) me to use this command. If you want to disable then buy premium to listen interruption free **music**!`)
    ],
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel(`Vote`)
        .setStyle("LINK")
        .setURL("https://top.gg/bot/927092113315868713")
      )
    ]
  })
}
    //Voice Only
    if (command.inVc && !memberChannel) {
      return interaction.reply('You must be in a Voice Channel to use this Command!')
    }
  //same vc
  if (command.sameVc && player && botChannel !== memberChannel) {

    return interaction.reply('You must be in the same Voice Channel as me!')


  }
  //player
  if (command.player && !player) {
    return  interaction.followUp(`No Player exists for this Guild!`)
  }
    if (command.current && !player.currentTrack){
interaction.followUp("There is nothing playing right now!")
    }



//error aayga sayad



      
       
        try {

            command.run(client, interaction)

        } catch (e) {

            interaction.reply({ content: e.message });


        }

    }


}