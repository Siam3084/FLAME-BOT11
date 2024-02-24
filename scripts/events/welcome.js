const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
  global.temp.welcomeEvent = {};

module.exports = {
  config: {
    name: "welcome",
    version: "1.5",
    author: "NTKhang",
    category: "events"
  },

  langs: {
    en: {
      welcomeMessage: "𝘑𝘦 𝘮'𝘦𝘯 𝘳é𝘫𝘰𝘶𝘪𝘴 𝘥'ê𝘵𝘳𝘦 𝘪𝘯𝘷𝘪𝘵é 𝘥𝘢𝘯𝘴 𝘤𝘦 𝘨𝘳𝘰𝘶𝘱𝘦 !🎉\n𝘓𝘦 𝘱𝘳é𝘧𝘪𝘹𝘦 𝘥𝘶 𝘣𝘰𝘵 :%1\n𝘗𝘰𝘶𝘳 𝘷𝘰𝘪𝘳 𝘮𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦s, 𝘴𝘢𝘪𝘴𝘪𝘴𝘴𝘦𝘻 :%1𝘩𝘦𝘭𝘱",
      defaultWelcomeMessage: `╭━━━━━━━━━━━━━━━╮\n┃𝖧𝗂 {userName} \n┃𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝖺𝗆𝗈𝗇𝗀 𝗎𝗌 \n┃𝗒𝗈𝗎'𝗋𝖾 {memberCount} 𝗍𝗁 𝗆𝖾𝗆𝖻𝖾𝗋 \n┃𝖨 𝖺𝗆 𝖨𝗍𝖺𝖼𝗁𝗂, 𝖾𝖽𝗂𝗍𝖾𝖽 𝖻𝗈𝗍\n┃𝖻𝗒: 𝗘𝗟𝗜𝗔𝗦 𝗕𝗔𝗥𝗨𝗧𝗜\n┃━━━━━━━━━━━━━━━━━╮\n┃facebook.com/eliasbaruti45┃ \n╰━━━━━━━━━━━━━━━━━╯`
    }
  },

  onStart: async ({ threadsData, message, event, api, getLang }) => {
    if (event.logMessageType == "log:subscribe")
      return async function () {
        const hours = getTime("HH");
        const { threadID } = event;
        const { nickNameBot } = global.GoatBot.config;
        const prefix = global.utils.getPrefix(threadID);
        const dataAddedParticipants = event.logMessageData.addedParticipants;
        // if new member is bot
        if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
          if (nickNameBot)
            api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
          return message.send(getLang("welcomeMessage", prefix));
        }
        // if new member:
        if (!global.temp.welcomeEvent[threadID])
          global.temp.welcomeEvent[threadID] = {
            joinTimeout: null,
            dataAddedParticipants: []
          };

        global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
        clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

        global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
          const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
          const threadData = await threadsData.get(threadID);
          const dataBanned = threadData.data.banned_ban || [];
          if (threadData.settings.sendWelcomeMessage == false)
            return;
          const threadName = threadData.threadName;
	  const memberCount = threadData.participantIDs.length;
          const userName = [],
            mentions = [];
          let multiple = false;

          if (dataAddedParticipants.length > 1)
            multiple = true;

          for (const user of dataAddedParticipants) {
            if (dataBanned.some((item) => item.id == user.userFbId))
              continue;
            userName.push(user.fullName);
            mentions.push({
              tag: user.fullName,
              id: user.userFbId
            });
          }
          // {userName}:   name of new member
          // {multiple}:
          // {boxName}:    name of group
          // {threadName}: name of group
          // {session}:    session of day
          if (userName.length == 0) return;
          let { welcomeMessage = getLang("defaultWelcomeMessage") } =
            threadData.data;
          const form = {
            mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
          };
          welcomeMessage = welcomeMessage
            .replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
            .replace(/\{memberCount\}/g, memberCount)
            .replace(/\{boxName\}|\{threadName\}/g, threadName)
            .replace(
              /\{multiple\}/g,
              multiple ? getLang("multiple2") : getLang("multiple1")
            )
            .replace(
              /\{session\}/g,
              hours <= 10
                ? getLang("session1")
                : hours <= 12
                  ? getLang("session2")
                  : hours <= 18
                    ? getLang("session3")
                    : getLang("session4")
            );
								

          form.body = welcomeMessage;

          if (threadData.data.welcomeAttachment) {
            const files = threadData.data.welcomeAttachment;
            const attachments = files.reduce((acc, file) => {
              acc.push(drive.getFile(file, "stream"));
              return acc;
            }, []);
            form.attachment = (await Promise.allSettled(attachments))
              .filter(({ status }) => status == "fulfilled")
              .map(({ value }) => value);
          }
          message.send(form);
          delete global.temp.welcomeEvent[threadID];
        }, 1500);
      };
  }
};
