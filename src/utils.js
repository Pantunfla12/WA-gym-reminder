const { schedule, routines, comandos } = require("./data");
const moment = require("moment-timezone");
moment.tz.setDefault("America/Mexico_City");

const getMsgFromGroup = async (client, group) => {
  const chats = await client.getChats();
  chats.map((chat) => {
    if (chat.isGroup && chat.name === group) {
      chat.fetchMessages({ limit: 10 }).then((messages) => {
        messages.map((message) => {
          // console.log(message.body);
        });
      });
    }
  });
};

const sendMsgToGroup = async (msg, client, group) => {
  const chats = await client.getChats();
  chats.map((chat) => {
    if (chat.isGroup && chat.name === group) {
      chat.sendMessage(msg);
    }
  });
};

const getDate = () => {
  const date = moment().format("DD/MM/YYYY");
  // const date = mex.format("DD/MM/YYYY");
  return date;
};

const currentTime = () => {
  const time = moment().format("H");

  return time;
};

const getWeekDay = () => {
  const day = moment().format("dddd");
  // const tomorrow = moment().add(1, "days").format("dddd");
  // const day = mex.format("dddd");
  return day;
};

const getRoutine = (id_routine) => {
  const day = getWeekDay();
  const currentDay = schedule.find((item) => item.day === day);
  if (currentDay.isWorkDay) {
    const routine = `Hoy te toca *${routines[id_routine]}*`;
    return routine;
  } else {
    return { routine: "Hoy es dia de descanso" };
  }
};

const commandList = (msg) => {
  if (msg.body === "!comandos") {
    return msg.reply(
      "Estos son los comandos disponibles: \n" +
        comandos.map((item) => item).join("\n")
    );
  }

  if (msg.body === "!only") {
    return msg.reply("🤨📸");
  }

  if (msg.body === "!ping") {
    msg.reply("pong!");
  }
};

module.exports = {
  getMsgFromGroup,
  sendMsgToGroup,
  getDate,
  currentTime,
  getWeekDay,
  getRoutine,
  commandList,
};
