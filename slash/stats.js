const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'stats',
    description: "check Antom bot's status",
    run: async (client, interaction, args) => {
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    interaction.reply({
      content: `**Servers**: ${scount}
**Users**: ${mcount}`
    });
    },
};
