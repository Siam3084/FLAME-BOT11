const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "1.0",
    countDown: 20,
    role: 0,
    shortDescription: { vi: "", en: "" },
    longDescription: { vi: "", en: "" },
    category: "𝗨𝗦𝗘𝗙𝗨𝗟",
    guide: { en: "" },
    envConfig: {}
  },
  onStart: async function ({ message }) {
    const botName = "𝗘𝗿𝘄𝗶𝗻";
    const createDate = "4 / Dec / 2023";
    const botPrefix = "∆";
    const authorName = "ELIAS BARUTI";
    const ownAge = "17";
    const teamName = "eliasbaruti";
    const authorFB = "https://www.facebook.com/elias.baruti45";
    const tikTok = "tiktok.com/@eliasbaruti11";
    
    const now = moment().tz('Africa/Kinshasa');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('H:mm:ss');
    
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor(uptime / 3600);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} jours ${hours} heures ${minutes} minutes ${seconds} secondes`;

    message.reply({
      body: `✨𝗜𝗡𝗙𝗢𝘀 𝗦𝗨𝗥 𝗘𝗥𝗪𝗜𝗡 𝗘𝗧 𝗦𝗢𝗡 É𝗗𝗜𝗧𝗘𝗨𝗥✨\n\n 
\ 𝗡𝗢𝗠 : ➠${botName}\n
\ 𝗣𝗥𝗘𝗙𝗜𝗫 : ➠${botPrefix}\n
\ 𝗖𝗥ÉÉ 𝗟𝗘 : ➠${createDate}\n
\ 𝗧𝗘𝗠𝗣𝗦 𝗗'𝗘𝗫É𝗖𝗨𝗧𝗜𝗢𝗡: ➠${uptimeString}
===============
\ 𝗖𝗥É𝗔𝗧𝗘𝗨𝗥 𝗗𝗨 𝗕𝗢𝗧:➠${authorName}\n
\ â𝗴𝗲  : ➠${ownAge} ans\n
\ 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗸 𝗗𝘂 𝗖𝗥É𝗔𝗧𝗘𝗨𝗥: ➠${authorFB}\n
\ 𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗨 𝗖𝗥É𝗔𝗧𝗘𝗨𝗥: ➠${tikTok}\n
\ 𝗗𝗔𝗧𝗘 : ➠${date}\n
\ 𝗧𝗘𝗠𝗣𝗦 : ➠${time}\n
\ É𝗤𝗨𝗜𝗡𝗘 : ➠${teamName}\n
\ ===============\n
\ nb°1: VEUILLEZ À NE PAS SPAMMER LE ROBOT OU IL SERA BLOQUÉ, ET JE BANNIRAI LE SPAMMEUR DU SYSTÈME ERWIN 👀\n
\ nb°2: JE SUIS CÉLIBATAIRE ENDURCI 😼`
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};
