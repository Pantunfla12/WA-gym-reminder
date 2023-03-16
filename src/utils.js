const { comandos } = require("./data");

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

const commandList = (msg) => {
  if (msg.body === "!comandos") {
    return msg.reply(
      "Estos son los comandos disponibles: \n" +
        comandos.map((item) => item).join("\n")
    );
  }

  if (msg.body === "!ping") {
    msg.reply("pong!");
  }
};

module.exports = {
  getMsgFromGroup,
  sendMsgToGroup,
  commandList,
};
