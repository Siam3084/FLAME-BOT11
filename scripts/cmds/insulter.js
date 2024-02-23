const axios = require("axios");

module.exports = {
  config: {
    name: "insulte",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Insultez quelqu'un en utilisant cette commande",
    category: "𝗙𝗨𝗡",
    guide: "{pn} mention",
  },

  onStart: async function ({ api, event, args }) {
    try {
      const mentionName = args.join(" ");

      if (!mentionName) {
        api.sendMessage("Veuillez spécifier une personne à insulter.", event.threadID);
        return;
      }

      const forbiddenNames = ["Elias", "baruti", "Erwin","elias","ELIAS","BARUTI"];

      if (forbiddenNames.some(name => mentionName.toLowerCase().includes(name))) {
        api.sendMessage("Va te faire fondre, sale putas 🤨 tu ne peux pas insulter mon créateur🖕🏾", event.threadID);
        return;
      }

      const url = "https://evilinsult.com/generate_insult.php?lang=fr&type=json";

      const response = await axios.get(url);
      const insult = response.data.insult;

      const insultMessage = `${mentionName}, ${insult}`;
      api.sendMessage(insultMessage, event.threadID);

    } catch (error) {
      console.error(error);
      api.sendMessage("Erreur !", event.threadID);
    }
  },
};
