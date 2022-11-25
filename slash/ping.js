const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Check my ping!',
    run: async (client, interaction) => {
      let pembed = new MessageEmbed()
		  .setColor('#10F292')	
		  .setTitle('Ping')
		  .addField('**Latency**', `\`${Date.now() - interaction.createdTimestamp}ms\``)
		  .addField('**API Latency**', `\`${Math.round(client.ws.ping)}ms\``)
		  .setTimestamp()
                  .setFooter({
                     text: `${interaction.user.username}`,
                     iconURL: interaction.user.displayAvatarURL()
                  })
        interaction.reply({
          embeds: [pembed]
        });
    },
};
