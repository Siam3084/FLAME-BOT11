const Préfixes = [
  '/ai',
  'Kim',
  "Némo",
  '+ai',
  'némo',
  'ai',
  'demander',
];
 
module.exports = {
  configuration : {
    nom : "demander",
    version : 1.0,
    auteur : "OtinXSandip",
    longueDescription : "IA",
    catégorie : "ai",
    guide: {
      fr: "{p} questions",
    },
  },
  onStart : fonction asynchrone () {},
  onChat : fonction asynchrone ({ api, événement, arguments, message }) {
    essayer {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      si (!préfixe) {
        retour; // Préfixe invalide, ignorer la commande
      }
      const prompt = event.body.substring(prefix.length).trim();
      si (!invite) {
        wait message.reply("𝗉𝗅𝖾𝖺𝗌𝖾 𝖺𝗌𝗄 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇!\n𝖨𝗍𝖺𝖼𝗁𝗂 𝗐𝗂𝗅 𝗅 𝖺𝗇𝗌𝗐𝖾𝗋!🫧\n𝖾𝗅𝗅𝗂𝖺𝗌.𝖻𝖺𝗋𝗎𝗍𝗂");
        retour;
      }
 
      const réponse = attendre axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const réponse = réponse.data.answer;
 
      wait message.reply({ body: `꧁𝖨𝗍𝖺𝖼𝗁𝗂꧂\n\n\n${answer}\n╔════☾✿☽════╗\n┃ 𝗘𝗟𝗜𝗔𝗦 𝗕𝗔 𝗥𝗨𝗧𝗜 ┃\n╚════☾❀☽═ ═══╝` });
    } attraper (erreur) {
      console.error("Erreur:", erreur.message);
    }
  }
} ;
