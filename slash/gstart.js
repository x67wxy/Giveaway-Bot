const Discord = require("discord.js")
const { Permissions } = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'gstart',
  description: 'Start a giveaway',

  options: [
    {
      name: 'duration',
      description: 'How long the giveaway should last for. example:- 1m, 1h, 1d, 1s',
      type: 'STRING',
      required: true
    },
    {
      name: 'winners',
      description: 'select winners amount example:- 1',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'prize',
      description: 'What the prize of the giveaway should be example:- Nitro',
      type: 'STRING',
      required: true
    },
    {
      name: 'channel',
      description: 'The channel to start the giveaway in example:- #giveaways',
      type: 'CHANNEL',
      channelTypes: ['GUILD_TEXT'],
      required: true
    },
  ],

  run: async (client, interaction, message ) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_GUILD') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: '<:error:992024170785427537>Get Manage_Server Perms To Start Giveaways!',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: '<:error:992024170785427537> Select A Text Channel',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: '<:error:992024170785427537> Select A Valid Time!!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: '<:error:992024170785427537> Select A Valid Winner Count, i.e: 1 or More.',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `<:error:992024170785427537> You must specify how many bonus entries would ${bonusRole} recieve!`,
          ephemeral: true
        });
      }
    }
if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content:"<:error:992024170785427537> Enough Permissions Not Found For The Bot!" })

    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.editReply({
          embeds: [{
            color: "#2F3136",
            author: {
              name: client.user.username,
              iconURL: client.user.displayAvatarURL() 
            },
            title: "Server Check!",
            url: "https://discord.gg/arch-invite",
            description:
              "Woah woah woah! I see a new server! are you sure I am in that? You need to invite me there to set that as a requirement! 😳",
            timestamp: new Date(),
            footer: {
              iconURL: client.user.displayAvatarURL(),
              text: "Server Check"
            }
          }]
        })
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**React with <:Giveaways:1014213362235736105> to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**React with <:Giveaways:1014213362235736105> to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!\n- Members are required to join [this server](${invite}) to participate in this giveaway!`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**React with <:Giveaways:1014213362235736105> to participate!**\n>>> - Members are required to join [this server](${invite}) to participate in this giveaway!`
    }

    // start giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayWinnerCount),
      hostedBy: interaction.member,
      // BonusEntries If Provided
      bonusEntries: [
        {
          // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      // Messages
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `<:success:992024105975037992> Giveaway started in ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.MessageEmbed()
        .setAuthor({ name: `Bonus Entries Alert!` })
        .setDescription(
          `**${bonusRole}** Has **${bonusEntries}** Extra Entries in this giveaway!`
        )
        .setColor("#2F3136")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};
