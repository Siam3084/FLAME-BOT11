const fast = require('fast-speedtest-api');

module.exports = {
  config: {
    name: "speedtest",
    aliases: ["speed","rapidité"],
    version: "1.0",
    author: "Samir",
    countDown: 30,
    role: 2,
    shortDescription: "Check system speed",
    longDescription: "Check system speed",
    category: "𝗖𝗢𝗡𝗙𝗜𝗚",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const speedTest = new fast({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
        verbose: false,
        timeout: 10000,
        https: true,
        urlCount: 5,
        bufferSize: 8,
        unit: fast.UNITS.Mbps
      });

      console.log('Starting speed test...'); // Added for debugging purposes

      const result = await speedTest.getSpeed();
      console.log('Speed test completed:', result); // Added for debugging purposes

      const message = "𝗹𝗮 𝘃𝗶𝘁𝗲𝘀𝘀𝗲 𝗱'𝗘𝗿𝘄𝗶𝗻 à 𝘁𝗿𝗮𝗶𝘁𝗲𝗿 𝗹𝗲𝘀 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀 𝗲𝘁 à 𝘆 𝗿é𝗽𝗼𝗻𝗱𝗿𝗲 𝗲𝘀𝘁 𝗱𝗲 " +
        "\n " +
        "\n➠  RAPIDITÉ : " + result + " MBPS";

      console.log('Sending message:', message); // Added for debugging purposes

      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error occurred:', error); // Added for debugging purposes
      return api.sendMessage("Error occurred during the speed test.", event.threadID, event.messageID);
    }
  }
};