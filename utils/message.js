const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
   "<:Giveaways:1014213362235736105> **GIVEAWAY** <:Giveaways:1014213362235736105>",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<:Giveaways:1014213362235736105> **GIVEAWAY ENDED** <:Giveaways:1014213362235736105>",
  drawing:  `Ends: **{timestamp}**`,
  inviteToParticipate: `React with <:Giveaways:1014213362235736105> to participate!`,
  winMessage: "<:Giveaways:1014213362235736105> Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "ends at",
  noWinner: "Giveaway cancelled, no valid participations.",
  hostedBy: `Hosted by: {this.hostedBy}`,
  winners: "winners",
  endedAt: "Ended at"
}
