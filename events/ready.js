const DB = require("../Models/247")
module.exports.run = async (client) => {

  let guild = await client.guilds.fetch()
  client.poru.init(client)
  DB.find().then(async(documentsArray) => {
    documentsArray.forEach((d) => {
      const Guild = client.guilds.cache.get(d.Guild)
      const voiceChannel = client.channels.cache.get(d.voiceChannel)
      const textChannel = client.channels.cache.get(d.textChannel)
      setTimeout(async() => {
        client.poru.createConnection({
          guild: Guild,
          voiceChannel: voiceChannel,
          textChannel: textChannel,
          selfDeaf: true,
          selfMute: false,
        })
        console.log(`Reconnected in ${voiceChannel.guild.name}`)
      }, 10000)
    })
  })
  console.log(`[API] ${client.user.username} is ready with ${client.guilds.cache.size} server`);
 
    setInterval(() => {
      const statuses = [
        "/play"
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "LISTENING" });
    }, 10000);


}
