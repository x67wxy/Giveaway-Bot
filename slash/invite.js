const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'invite',
    description: 'invite antom in your server',
    run: async (client, interaction, args) => {
const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Invite`)
        .setStyle('LINK')
        .setURL(`https://dsc.gg/arch-invite`),)
        interaction.reply({
          content: `Invite Me`,
          components: [row]
      });
    }
}; 
