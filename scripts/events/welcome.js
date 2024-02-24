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
      defaultWelcomeMessage: `𝗦𝗮𝗹𝘂𝘁 !✨  {userName} 𝗠𝗼𝗶 𝗰'𝗲𝘀𝘁 ERWIN.SMITH\n𝗝𝗲 𝘃𝗼𝘂𝗱𝗿𝗮𝗶𝘀 𝗷𝘂𝘀𝘁𝗲 𝘃𝗼𝘂𝘀 𝘀𝗼𝘂𝗵𝗮𝗶𝘁𝗲𝘇 𝗹𝗮 𝗯𝗶𝗲𝗻𝘃𝗲𝗻𝘂𝗲 𝗗𝗮𝗻𝘀 𝗰𝗲 𝗺𝗮𝗴𝗻𝗶𝗳𝗶𝗾𝘂𝗲 𝗴𝗿𝗼𝘂𝗽𝗲✌🏾 : {boxName}\n𝗦𝗲𝗻𝘁𝗲𝘇-𝘃𝗼𝘂𝘀 à 𝗹'𝗮𝗶𝘀𝗲 🤪🤸🏾‍♂️\n𝗝'𝗮𝗶 é𝘁é 𝗰𝗿éé 𝗽𝗮𝗿 *𝗘𝗟𝗜𝗔𝗦𝗕𝗔𝗥𝗨𝗧𝗜* \nhttps://www.facebook.com/elias.baruti45`
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
