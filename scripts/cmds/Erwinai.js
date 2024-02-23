const axios = require("axios");

module.exports = {
    config: {
        name: 'erwinai',
        version: '1.2',
        author: 'Xemon',
        countDown: 15,
        role: 1,
        shortDescription: 'Anya AI',
        longDescription: {
            vi: 'Chat với simsimi',
            en: 'Chat with Anya',
            fr: 'Discutez avec Anya'
        },
        category: '𝗙𝗨𝗡',
        guide: {
            vi: '   {pn} [on | off]: bật/tắt simsimi'
                + '\n'
                + '\n   {pn} <word>: chat nhanh với simsimi'
                + '\n   Ví dụ:\n    {pn} hi',
            en: '   {pn} <word>: chat with hina'
                + '\n   Example:\n    {pn} hi',
            fr: '   {pn} [on | off]: activez/désactivez simsimi'
                + '\n'
                + '\n   {pn} <mot>: discutez rapidement avec simsimi'
                + '\n   Exemple:\n    {pn} bonjour'
        }
    },

    langs: {
        vi: {
            turnedOn: 'Bật simsimi thành công!',
            turnedOff: 'Tắt simsimi thành công!',
            chatting: 'Đang chat với simsimi...',
            error: 'Simsimi đang bận, bạn hãy thử lại sau'
        },
        en: {
            turnedOn: '✅ | Erwin will start talking 😼 !',
            turnedOff: '✅ | Erwin will no longer talk 😔 !',
            chatting: 'Already Chatting with simsimi...',
            error: 'What🙂'
        },
        fr: {
            turnedOn: '✅ | Erwin commencera à parler 😼 !',
            turnedOff: '✅ | Erwin ne parlera plus 😔 !',
            chatting: 'Déjà en train de discuter avec simsimi...',
            error: 'Quoi🙂'
        }
    },

    onStart: async function ({ args, threadsData, message, event, getLang }) {
        if (args[0] == 'on' || args[0] == 'off') {
            await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
            return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
        } else if (args[0]) {
            const yourMessage = args.join(" ");
            try {
                const responseMessage = await getMessage(yourMessage);
                return message.reply(`${responseMessage}`);
            } catch (err) {
                console.log(err);
                return message.reply(getLang("error"));
            }
        }
    },

    onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
        if (args.length > 1 && !isUserCallCommand && await threadsData.get(event.threadID, "settings.simsimi")) {
            try {
                const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
                const responseMessage = await getMessage(args.join(" "), langCode);
                return message.reply(`${responseMessage}`);
            } catch (err) {
                return message.reply(getLang("error"));
            }
        }
    }
};

async function getMessage(yourMessage, langCode) {
    const res = await axios.post(
        'https://api.simsimi.vn/v1/simtalk',
        new URLSearchParams({
            'text': yourMessage,
            'lc': langCode
        })
    );

    if (res.status > 200) throw new Error(res.data.success);

    return res.data.message;
}
