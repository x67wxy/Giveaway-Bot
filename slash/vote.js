const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'vote',
    description: 'vote antom in top.gg',
    run: async (client, interaction, args) => {
const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Vote in top.gg`)
        .setStyle('LINK')
        .setURL(`https://dsc.gg/arch-invite`),)
        interaction.reply({
          content: `Vote me`,
          components: [row]
        });
    }
};
