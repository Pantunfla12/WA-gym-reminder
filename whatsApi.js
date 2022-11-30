const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const moment = require("moment");
const { routines, schedule } = require("./src/data");
const {
  getMsgFromGroup,
  sendMsgToGroup,
  getDate,
  currentTime,
  getWeekDay,
  getRoutine,
} = require("./src/utils");

const customId = "client-id";
const authStrategy = new LocalAuth({ clientId: customId });

const worker = `${authStrategy.dataPath}/session-${customId}/Default/Service Worker`;

if (fs.existsSync(worker)) {
  fs.rmdirSync(worker, { recursive: true });
}

const client = new Client({
  authStrategy,
});

client.initialize();

client.on("loading_screen", (percent, message) => {
  console.log("LOADING SCREEN", percent, message);
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  sendMsgToGroup("Bot is ready!", client);
  //   setInterval(() => {
  //     const obj = currentTime();
  //     const { hour } = obj;
  //     if (hour == 6) {
  //       sendMsgToGroup();
  //     }
  //   }, 1000);
});

client.on("message", (msg) => {
  if (msg.body === "ping") {
    msg.reply("pong");
  }
});

client.on("message_create", (msg) => {
  if (msg.fromMe) {
    console.log("Message from me", msg.body);

    if (msg.body === "dime la fecha") {
      msg.reply(getDate());
    }

    if (msg.body === "rutina") {
      const routine = getRoutine();
      console.log("rutina", routine);
      msg.reply(routine);
    }
  }
});
