const { MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction, MessageButton } = require("discord.js")

module.exports = {
  name: 'help',
  description: ' View all the commands available to the bot!',
  run: async (client, message) => {
  const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Invite`)
        .setStyle('LINK')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=1011133216108851270&permissions=8&scope=bot%20applications.commands`),
        new MessageButton()
        .setLabel('Support Server')
        .setStyle('LINK')
        .setURL("https://discord.gg/crisisbot"),
          new MessageButton()
        .setLabel('Vote in top.gg')
        .setStyle('LINK')
        .setURL("https://top.gg/bot/1011133216108851270/vote"),
    ) 
                  
    const embed = new MessageEmbed()
      .setColor('#10F292')
.setDescription('**<:Giveaways:1014213362235736105> Arxane, An Advance Giveaway Bot <:Giveaways:1014213362235736105>**')
.addField(`**<:fenix_dash:1007475039731466320> Arxane**`,`**<:rep:992046915170619414> Prefix: /\n<:rep:992046915170619414> Cmds: 15**`,true)
  .addField(`**All Modules**`,`<:Giveaways:1014213362235736105> Giveaway\n<:badge_supporter:1000725671120752700> General\n<a:chat:1001173447868694568> Home`,true)
      .setTimestamp()
      .setFooter({
    text: `Arxane By Fenix..#1901`,
      })

 const giveaway = new MessageEmbed()
  .setTitle("Giveaway")
  .setColor('#10F292')
  .setDescription("**<:Giveaways:1014213362235736105> Giveaway Commands <:Giveaways:1014213362235736105>")
  .addFields(
    { name: 'Gstart'  , value: `Start a giveaway in your guild!\n**• Slash Command Only:** \`Start\` `, inline: true },
    { name: 'Edit' , value: `Edit an already running giveaway!\n**• Slash Only:** \`Edit\` `, inline: true },
    { name: 'End' , value: `End an already running giveaway!\n**• Slash Only:** \`End\` `, inline: true },
    { name: 'List' , value: `List all the giveaways running within this guild!\n **• Slash Only:** \`List\` `, inline: true },
    { name: 'Pause' , value: `Pause an already running giveaway!\n**• Slash Only:** \`Pause\` `, inline: true },
    { name: 'Reroll' , value: `Reroll an ended giveaway!\n**• Slash Only:** \`Reroll\` `, inline: true },
    { name: 'Resume' , value: `Resume a paused giveaway!\n**• Slash Only:** \`Resume\` `, inline: true },
  )
  .setTimestamp()
  .setFooter({
    text: `Arxane By Fenix..#1901`,
      })



    const general = new MessageEmbed()
      .setTitle("General")
      .setColor('10F292')
  .setDescription("**<a:antom_gws:1011654074942365716>Here are the general bot commands**")
  .addFields(
    { name: 'Help'  , value: `Shows all available commands to this bot!\n <a:antom_arrow:1011849329083957402> **OnlySlash:** \`Help\` `, inline: true },
    { name: 'Invite' , value: `Get the bot's invite link!\n <a:antom_arrow:1011849329083957402> **OnlySlash:** \`Invite\` `, inline: true },
    { name: 'Ping' , value: `Check the bot's websocket latency!\n <a:antom_arrow:1011849329083957402> **OnlySlash:** \`Ping\` `, inline: true },
    { name: 'Vote' , value: `vote antom in top.gg\n <a:antom_arrow:1011849329083957402> **OnlySlash:** \`Vote\` `, inline: true },
   { name: 'Stats' , value: `check antom bot status\n <a:antom_arrow:1011849329083957402> **OnlySlash:** \`stats\` `, inline: true },
  )
  .setTimestamp()
  .setFooter({
    text: `Antom`,
      })

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Please Select a Category")
        .setDisabled(state)
        .addOptions([{
                label: `Giveaways`,
                value: `giveaway`,
                description: `View all the giveaway based commands!`,
                emoji: `1014213362235736105`
            },
            {
                label: `General`,
                value: `general`,
                description: `View all the general bot commands!`,
               emoji: `1000725671120752700`
            },
          {
                label: `Home`,
                value: `embed`,
                description: `Home`,
                emoji: `1001173447868694568`
          }
        ])
    ),
];

    const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === interaction.member.id;

    const collector = message.channel.createMessageComponentCollector(
      {
        filter,
        componentType: "SELECT_MENU",
        idle: 300000,
        dispose: true,
        components: [row],
      });

    collector.on('collect', (interaction) => {
      if (interaction.values[0] === "giveaway") {
        interaction.update({ embeds:[giveaway], components: components(false) }).catch((e) => { });
      } else if (interaction.values[0] === "general") {
        interaction.update({ embeds: [general], components: components(false) }).catch((e) => { });
      } else if (interaction.values[0] === "embed") {
        interaction.update({ embeds: [embed], components: components(false) }).catch((e) => { });

      }
    });
    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Collector Destroyed, Try Again!",
          components: [],
        });
      }
    })
  }
}
