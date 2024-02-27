const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'nemoo',
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
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("𝗏𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝗉𝗈𝗌𝖾𝗋 𝗎𝗇𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇!\n 𝗏𝖺 𝗋é𝗉𝗈𝗇𝖽𝗋𝖾!🫧\n𝖾𝗅𝗂𝖺𝗌.𝖻𝖺𝗋𝗎𝗍𝗂");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
