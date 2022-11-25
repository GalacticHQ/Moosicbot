const discord = require("discord.js");
const mongoose = require("mongoose");
const { Poru } = require("poru");
const autoConnect = require("./Models/247")
const ms = require("ms")
require("dotenv").config()
const client = new discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS","GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});
module.exports = client;
client.user
client.login(process.env.TOKEN).catch(e => console.log("No token provided"))
mongoose.connect("mongodb+srv://KryptonOp:iam_krypton@musicdb.oxulu3n.mongodb.net/test").then(() => {
  console.log(`Connected to Database (MongoDB)`)
})


client.config = require("./config.json");
client.poru = new Poru(client, client.config.nodes,{
  spotify:{
    clientID:"cb41529dc3bd4d8f8a240dbee0fff4e8",
   clientSecret:"bcca82f42930498aa385a8289fdf276b"
    },
    reconnectTime: 0,
    resumeKey: "MyPlayers",
    resumeTimeout : 60,
    defaultPlatform: "ytsearch",
    playlistLimit :5,
    albumLimit :5,
    artistLimit :5,
    searchMarket : "us"
})
const { Api } = require("@top-gg/sdk")
let topggtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyNzA5MjExMzMxNTg2ODcxMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU3NzIwMTA2fQ.RRqlA5zE7r5R5u2pnUhImQGprAh9CDjUfFZj7b_q2vw"
const topggClient = new Api(topggtoken, this)
module.exports = topggClient;

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.slash = new discord.Collection();

//now creating interaction event
["commands","events","slash","PoruEvent"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("guildCreate", async(guild) => {
  console.log(`${guild.name}`)
})



