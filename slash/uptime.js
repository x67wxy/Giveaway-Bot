const { Interaction } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name:"uptime",
    description:"check antom's uptime",
    run: async( client, interaction, args ) => {
        const duration1 = moment.duration(interaction.client.uptime).format(" d [days], h [hrs], m [mins], s [secs]");
        interaction.reply({
        content:`**Uptime** : ${duration1}`
        }
        )
    }
}
