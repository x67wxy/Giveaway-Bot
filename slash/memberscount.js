module.exports = {
    name: "memberscount",
    description: "Check server Memberscount",
    run: async (client, interaction, args) => {
        interaction.reply({
         content: `**Members:** ${interaction.guild.memberCount}`
        });
    },
};
