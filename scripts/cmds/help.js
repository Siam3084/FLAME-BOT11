∆cmd install help.js const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[]";

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Afficher l'utilisation des commandes.",
    },
    longDescription: {
      en: "Afficher l'utilisation des commandes et répertorier directement toutes les commandes.",
    },
    category: "info",
    guide: {
      en: " pour voir toutes les commandes veuillez taper : help",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = "";

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += ``;

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭━━━O『${category.toUpperCase()}』`;
          const names = categories[category].commands.sort();

          for (let i = 0; i < names.length; i += 1) {
            const cmds = names.slice(i, i + 1).map((item) => `●${item}`);
            msg += `\n┃ ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }
          msg +=`\n╰━━━━━━━━━━━❍`;
        }
      });

      const totalCommands = commands.size;

      msg += `\n╭ ───── ╮\n│ 𝗚𝗨𝗜𝗗𝗘  │\n╰ ───── ╯\n𝗣𝗢𝗨𝗥 𝗟'𝗜𝗡𝗦𝗧𝗔𝗡𝗧 𝗘𝗥𝗪𝗜𝗡 𝗔${totalCommands}\n 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗘𝗦 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗕𝗟𝗘𝗦\n\n`;

msg+=`𝗣𝗢𝗨𝗥 𝗦𝗔𝗩𝗢𝗜𝗥 𝗨𝗦𝗘𝗥 𝗗𝗘 \n𝗖𝗘𝗦 𝗖𝗠𝗗𝗘𝗦 , 𝗦𝗔𝗜𝗦𝗜𝗦𝗦𝗘𝗭 : \n𝗛𝗘𝗟𝗣 + 𝗡𝗢𝗠 𝗗𝗘 𝗟𝗔 𝗖𝗠𝗗𝗘 \n𝗘𝗫: help ai \n\n`

      msg += `\n╔════☾✿☽════╗\n┃  𝗘𝗟𝗜𝗔𝗦 𝗕𝗔𝗥𝗨𝗧𝗜 ┃\n╚════☾❀☽════╝\nfacebook.com/elias.baruti45`;

      await message.reply(msg);
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`la Commande "${commandName}" n'est pas existante.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "inconnu 🤷🏾‍♂";
        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "pas de description 🤷🏾‍♂" : "pas de description 🤷🏾‍♂";
        const guideBody = configCommand.guide?.en || "Aucun guide disponible🤷🏾‍♂.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = ` ✲═══════.〖✨NOM✨〗.═══════✲
   │ ${configCommand.name}
  ✲══════〖✨INFOS✨〗══════✲
   │ ✨Description✨ : ${longDescription}
|✨Autres noms✨ : ${configCommand.aliases ? configCommand.aliases.join(", ") : "Ne pas avoir"}
   │ Autres noms dans votre groupe : Je n'en ai pas
   │ ✨Version✨ : ${configCommand.version || "1.0"}
   │ ✨Rôle✨ : ${roleText}
   │ Temps par commande : ${configCommand.countDown || 1}s
   │ ✨Auteur✨ : ${author}
   ├── ✨Utilisation✨
   │ ${usage} 
   ├── Notes : ✨𝘔𝘖𝘐 𝘌𝘙𝘞𝘐𝘕.𝘚𝘔𝘐𝘛𝘏,𝘑𝘌 𝘚𝘜𝘐𝘚 𝘓'𝘜𝘕 𝘋𝘌 𝘔𝘌𝘐𝘓𝘓𝘌𝘜𝘙𝘚 𝘉𝘖𝘛𝘚 𝘔𝘌𝘚𝘚𝘌𝘕𝘎𝘌𝘙 É𝘋𝘐𝘛É 𝘗𝘈𝘙 𝘌𝘓𝘐𝘈𝘚 𝘉𝘈𝘙𝘜𝘛𝘐 𝘝𝘐𝘈 𝘎𝘖𝘈𝘛𝘒𝘖𝘛V2✨\n
    https://www.facebook.com/elias.baruti45
   ✲═══.〖✨𝘌𝘓𝘐𝘈𝘚𝘉𝘈𝘙𝘜𝘛𝘐✨〗.═══✲`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (Tout le monde peut utiliser)";
    case 1:
      return "1 (seuls les administrateurs du groupe)";
    case 2:
      return "2 (seul l'administrateur du bot peut utiliser)";
    default:
      return "Unknown role";
  }
        }
