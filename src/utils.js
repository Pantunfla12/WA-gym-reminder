const { schedule, routines } = require("./data");
const moment = require("moment");

var id_routine = 5;

const getMsgFromGroup = async (client) => {
  const chats = await client.getChats();
  chats.map((chat) => {
    if (chat.isGroup && chat.name === "testing") {
      chat.fetchMessages({ limit: 10 }).then((messages) => {
        messages.map((message) => {
          console.log(message.body);
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
  const date = moment().format("DD/MM/YYYY");
  return date;
};

const currentTime = () => {
  const time = moment().format("H:mm:ss");
  return time;
};

const getWeekDay = () => {
  const day = moment().format("dddd");
  return day;
};

const getRoutine = () => {
  if (id_routine > routines.length) {
    id_routine = 0;
  }

  const day = getWeekDay();
  const currentDay = schedule.find((item) => item.day === day);
  if (id_routine > routines.length) {
    id_routine = 0;
  }
  if (currentDay.isWorkDay) {
    const routine = routines[id_routine];
    id_routine++;
    return routine;
  } else {
    return "No hay rutina para hoy";
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
