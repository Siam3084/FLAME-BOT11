const axios = require('axios');
const jimp = require('jimp');
const fs = require('fs');

module.exports = {
  config: {
    name: 'fbcover',
    version: '1.0',
    author: 'munem.',
    countDown: 5,
    role: 0,
    shortDescription: {
      en: 'Create Facebook banner',
      fr: 'créer une photo de couverture Facebook'
    },
    longDescription: {
      en: 'Create Facebook banner',
      fr: 'créer une photo de couverture Facebook'
    },
    category: '𝗨𝗦𝗘𝗙𝗨𝗟',
    guide: {
      en: '{p}{n} <name> | <subname> | <address> | <phone> | <email> | <color>',
      fr: '{p}{n} <nom> | <sous-nom> | <adresse> | <téléphone> | <email> | <couleur>'
    }
  },

  langs: {
    en: {
      empty: 'Please enter in the following format:\n\n{p}{n} <name> | <subname> | <address> | <phone> | <email> | <color>',
      waiting: '🧘🏾‍♂Please wait...I’m generating your cover photo👨🏾‍🔧',
      ok: 'Your cover photo is ready 💝'
    },
    fr: {
      empty: 'S.V.P veuillez entrer le format suivant: \n\n{p}{n} votre prénom | votre nom | votre adresse | votre numéro de téléphone | votre email | votre couleur préférée',
      waiting: '🧘🏾‍♂️Veuillez patienter... je suis en train de générer votre photo de couverture👨🏾‍🔧',
      ok: 'Votre photo de couverture est prête 💝'
    }
  },

  onStart: async function ({ message, args, event, api, getLang, value }) {
    const info = args.join(' ');
    if (!info) {
      return message.reply(getLang(value ? 'empty' : 'empty'));
    } else {
      const msg = info.split('|');
      const name = msg[0];
      const subname = msg[1];
      const address = msg[2];
      const phone = msg[3];
      const email = msg[4];
      const color = msg[5] ? msg[5].trim() : '';

      await message.reply(getLang(value ? 'waiting' : 'waiting'));

      const img = `https://www.nguyenmanh.name.vn/api/fbcover1?name=${name}&uid=${event.senderID}&address=${address}&email=${email}&subname=${subname}&sdt=${phone}&color=${color}&apikey=sr7dxQss`;

      const form = {
        body: (getLang(value? 'ok':'ok')),
        attachment: []
      };

      form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form);
    }
  }
};
