const qrcode = require("qrcode-terminal");
const { ChatTypes } = require("whatsapp-web.js");

const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  sendMsgToGroup("Bot is ready!");
  setInterval(() => {
    const obj = currentTime();
    const { hour } = obj;
    if (hour == 6) {
      sendMsgToGroup();
    }
  }, 1000);
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
  }
});

const getMsgFromGroup = async () => {
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

const sendMsgToGroup = async (msg) => {
  const chats = await client.getChats();
  chats.map((chat) => {
    if (chat.isGroup && chat.name === "testing") {
      chat.sendMessage(msg);
    }
  });
};

const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  //   return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  return {
    day,
    month,
    year,
    hour,
    minute,
    second,
  };
};

const currentTime = () => {
  const date = getDate();
  const { hour, minute, second } = date;
  return { hour, minute, second };
};

client.initialize();
