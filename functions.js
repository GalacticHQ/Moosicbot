const {
    Interaction,
    Collection,
    MessageActionRow,
    MessageButton,
    ButtonInteraction,
    CommandInteraction,
    Client,
    Message,
  } = require("discord.js");

/**
 *
 * @param {CommandInteraction} interaction
 * @param {String[]} embeds
 * @returns
 */

async function pagination(interaction, embeds){
    let currentPage = 0;
    let allbuttons = new MessageActionRow().addComponents([
      new MessageButton().setStyle("PRIMARY").setCustomId("0").setEmoji(`⏪`),
      new MessageButton().setStyle("SUCCESS").setCustomId("1").setEmoji(`◀️`),
      new MessageButton().setStyle("SECONDARY").setCustomId("2").setEmoji("<a:Delete:1016017149128618015>"),
      new MessageButton().setStyle("SUCCESS").setCustomId("3").setEmoji(`▶️`),
      new MessageButton().setStyle("PRIMARY").setCustomId("4").setEmoji(`⏩`),
    ]);
    
    let swapmsg = await interaction.channel.send({
        embeds: [embeds[0]],
        components: [allbuttons],
      });
      const collector = swapmsg.createMessageComponentCollector({
        time: 2000 * 60,
      });
      collector.on("collect", async (b) => {
        if (b.isButton()) {
          await b.deferUpdate().catch((e) => {});
          // page first
          if (b.customId == "0") {
            await b.deferUpdate().catch((e) => {});
            if (currentPage !== 0) {
              currentPage = 0;
              await swapmsg.edit({
                embeds: [embeds[currentPage]],
                components: [allbuttons],
              });
              await b.deferUpdate().catch((e) => {});
            }
          }
          //page forward
          if (b.customId == "1") {
            await b.deferUpdate().catch((e) => {});
            if (currentPage !== 0) {
              currentPage -= 1;
              await swapmsg.edit({
                embeds: [embeds[currentPage]],
                components: [allbuttons],
              });
              await b.deferUpdate().catch((e) => {});
            } else {
              currentPage = embeds.length - 1;
              await swapmsg.edit({
                embeds: [embeds[currentPage]],
                components: [allbuttons],
              });
              await b.deferUpdate().catch((e) => {});
            }
          }
          //go home
          else if (b.customId == "2") {
            try {
              swapmsg.delete();
            } catch (e) {}
          }
          //go forward
          else if (b.customId == "3") {
            if (currentPage < embeds.length - 1) {
              currentPage++;
              await swapmsg.edit({
                embeds: [embeds[currentPage]],
                components: [allbuttons],
              });
            } else {
              currentPage = 0;
              await swapmsg.edit({
                embeds: [embeds[currentPage]],
                components: [allbuttons],
              });
            }
          }
          // page last
          if (b.customId == "4") {
            currentPage = embeds.length - 1;
            await swapmsg.edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            });
          }
        }
      });
    
      collector.on("end", () => {
        allbuttons.components.forEach((btn) => btn.setDisabled(true));
        swapmsg.edit({ components: [allbuttons] });
      });
}


module.exports = {
    pagination
}