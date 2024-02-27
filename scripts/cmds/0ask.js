const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'Nemo',
  '+ai',
  'nemo',
  'ai',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "𝗦𝗘𝗔𝗥𝗖𝗛",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      // Triez les préfixes par longueur décroissante
      Prefixes.sort((a, b) => b.length - a.length);
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Préfixe invalide, ignorer la commande
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("𝗉𝗅𝖾𝖺𝗌𝖾 𝖺𝗌𝗄 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇!\n𝖨𝗍𝖺𝖼𝗁𝗂 𝗐𝗂𝗅𝗅 𝖺𝗇𝗌𝗐𝖾𝗋!🫧\n𝖾𝗅𝗅𝗂𝖺𝗌.𝖻𝖺𝗋𝗎𝗍𝗂");
        return;
      }

      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent`);
      const answer = response.data.answer;

      await message.reply({ body: `━━━━━━━━━━━━━\n${answer}\n╭━━━━━━━━━━╮\n┃𝗘𝗟𝗜𝗔𝗦 𝗕𝗔𝗥𝗨𝗧𝗜┃\n╰━━━━━━━━━━╯` });
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  }
};
