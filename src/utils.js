const { schedule, routines } = require("./data");
const moment = require("moment-timezone");
const mex = moment().tz("America/Mexico_City");
var id_routine = 1;

const getMsgFromGroup = async (client) => {
  const chats = await client.getChats();
  chats.map((chat) => {
    if (chat.isGroup && chat.name === "testing") {
      chat.fetchMessages({ limit: 10 }).then((messages) => {
        messages.map((message) => {
          // console.log(message.body);
        });
      });
    }
  });
};

const sendMsgToGroup = async (msg, client) => {
  const chats = await client.getChats();
  chats.map((chat) => {
    if (chat.isGroup && chat.name === "testing") {
      chat.sendMessage(msg);
    }
  });
};

const getDate = () => {
  // const date = moment().format("DD/MM/YYYY");
  const date = mex.format("DD/MM/YYYY");
  return date;
};

const currentTime = () => {
  // const time = moment().format("H:mm:ss");
  const time = mex.format("H:mm:ss");
  return time;
};

const getWeekDay = () => {
  // const day = moment().format("dddd");
  const day = mex.format("dddd");
  return day;
};

const getRoutine = (alreadySentMsg) => {
  if (id_routine == 6) {
    id_routine = 0;
  }
  const day = getWeekDay();
  const currentDay = schedule.find((item) => item.day === day);
  if (currentDay.isWorkDay) {
    if (!alreadySentMsg) {
      const routine = `Hoy te toca *${routines[id_routine]}*`;
      const bool = true;
      id_routine++;
      return { routine, bool };
    } else {
      const routine = `Hoy te toca *${routines[id_routine - 1]}*`;
      const bool = true;
      // console.log("ya se envio");
      return { routine, bool };
    }
  } else {
    return { routine: "Hoy es dia de descanso" };
  }
};

module.exports = {
  getMsgFromGroup,
  sendMsgToGroup,
  getDate,
  currentTime,
  getWeekDay,
  getRoutine,
};
